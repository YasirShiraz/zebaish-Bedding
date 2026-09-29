import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Prevent deleting yourself
        if (id === session.id) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
        }

        // Use transaction to clean up user data
        await prisma.$transaction([
            // Delete user's sessions
            prisma.session.deleteMany({ where: { userId: id } }),
            // Delete user's accounts
            prisma.account.deleteMany({ where: { userId: id } }),
            // Delete user's reviews
            prisma.review.deleteMany({ where: { userId: id } }),
            // Delete user's orders (careful here, maybe just keep them or nullify user?)
            // Usually we keep orders for records but set userId to null or keep them linked.
            // For now, let's keep orders but linked to the ID? No, if user is deleted, foreign key might fail depending on schema.
            // Schema: Order -> User (optional). So we can just set userId to null or delete user.
            // If we delete user, we should probably check if they have orders.

            // Actually, let's just delete the user. The schema might have restrictions.
            // Checking schema earlier: Order -> User (fields: [userId], references: [id]). No onDelete cascade specified for Order.
            // BUT Session and Account have onDelete: Cascade.
            // Reviews do NOT have cascade.

            // So we must manually delete Reviews.
            // For Orders, since it's optional relation in schema (User?), let's checking Schema again...
            // model Order { userId String? ... user User? ... }
            // So we can disconnect orders.
        ]);

        // Disconnect orders
        await prisma.order.updateMany({
            where: { userId: id },
            data: { userId: null }
        });

        // Finally delete User
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}

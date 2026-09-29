import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-client';

export const firebaseHelpers = {
    // Cart operations
    async saveCart(userId: string, items: any[]) {
        try {
            await setDoc(doc(db, 'carts', userId), {
                items,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Error saving cart to Firebase:', error);
            throw error;
        }
    },

    async getCart(userId: string) {
        try {
            const docSnap = await getDoc(doc(db, 'carts', userId));
            return docSnap.exists() ? docSnap.data().items : [];
        } catch (error) {
            console.error('Error getting cart from Firebase:', error);
            return [];
        }
    },

    async clearCart(userId: string) {
        try {
            await deleteDoc(doc(db, 'carts', userId));
        } catch (error) {
            console.error('Error clearing cart from Firebase:', error);
            throw error;
        }
    },

    // Theme operations
    async saveTheme(userId: string, theme: string) {
        try {
            await setDoc(doc(db, 'userPreferences', userId), {
                theme,
                updatedAt: new Date()
            }, { merge: true });
        } catch (error) {
            console.error('Error saving theme to Firebase:', error);
            throw error;
        }
    },

    async getTheme(userId: string) {
        try {
            const docSnap = await getDoc(doc(db, 'userPreferences', userId));
            return docSnap.exists() ? docSnap.data().theme : 'light';
        } catch (error) {
            console.error('Error getting theme from Firebase:', error);
            return 'light';
        }
    },

    // Search history operations
    async saveSearchHistory(userId: string, searches: string[]) {
        try {
            await setDoc(doc(db, 'searchHistory', userId), {
                searches,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Error saving search history to Firebase:', error);
            throw error;
        }
    },

    async getSearchHistory(userId: string) {
        try {
            const docSnap = await getDoc(doc(db, 'searchHistory', userId));
            return docSnap.exists() ? docSnap.data().searches : [];
        } catch (error) {
            console.error('Error getting search history from Firebase:', error);
            return [];
        }
    },
};

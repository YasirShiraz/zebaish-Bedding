-- AlterTable
ALTER TABLE "Product" ADD COLUMN "shippingCost" REAL DEFAULT 0;
ALTER TABLE "Product" ADD COLUMN "taxRate" REAL DEFAULT 0;

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '/products',
    "cta" TEXT NOT NULL DEFAULT 'Shop Now',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HomePageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HomePageContent_sectionId_key" ON "HomePageContent"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

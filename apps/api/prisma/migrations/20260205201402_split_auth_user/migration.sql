/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `authId` to the `User` table without a default value. This is not possible if the table is not empty.

*/

-- 1. Create Auth Table
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- 2. Create Index on Auth email
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- 3. Data Migration: Copy User email/password to Auth
-- Ensuring we generate a UUID for the new ID. Using gen_random_uuid() if available (PG 13+), 
-- otherwise we fallback to a simple uuid generation trick or assume the extension is loaded.
-- Since this is Prisma with uuid(), pgcrypto or similar is often expected, but let's assume standard PG env.
INSERT INTO "Auth" ("id", "email", "password", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(), 
  "email", 
  "password", 
  "createdAt", 
  "updatedAt" 
FROM "User";

-- 4. Add nullable authId to User first
ALTER TABLE "User" ADD COLUMN "authId" TEXT;

-- 5. Data Migration: Link User back to Auth
UPDATE "User" 
SET "authId" = "Auth"."id"
FROM "Auth"
WHERE "User"."email" = "Auth"."email";

-- 6. Make authId required
ALTER TABLE "User" ALTER COLUMN "authId" SET NOT NULL;

-- 7. Add Constraints and Indexes for authId
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 8. Drop old User columns
DROP INDEX "User_email_key";
ALTER TABLE "User" DROP COLUMN "email", DROP COLUMN "password";

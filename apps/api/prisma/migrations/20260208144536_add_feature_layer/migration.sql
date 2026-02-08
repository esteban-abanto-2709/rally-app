-- 1. Create Feature Table
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- 2. Add Foreign Key for Feature -> Project (so we can insert safely)
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 3. Create default feature for existing projects
-- We use gen_random_uuid() which is available in Postgres 13+. 
-- If older, might need 'uuid-ossp' extension and uuid_generate_v4().
-- Assuming modern Postgres environment.
INSERT INTO "Feature" ("id", "name", "slug", "projectId", "updatedAt")
SELECT gen_random_uuid(), 'General', 'general', "id", CURRENT_TIMESTAMP FROM "Project";

-- 4. Add featureId column to Task (nullable initially)
ALTER TABLE "Task" ADD COLUMN "featureId" TEXT;

-- 5. Update existing tasks to point to the new Feature of their project
UPDATE "Task"
SET "featureId" = (
    SELECT "Feature"."id"
    FROM "Feature"
    WHERE "Feature"."projectId" = "Task"."projectId"
    LIMIT 1
);

-- 6. Handle any tasks that might still have NULL featureId (orphan tasks? shouldn't happen if FK constraint was valid)
-- If there were tasks without valid projects, they will still be NULL. 
-- We can delete them or leave them. Since we are adding NOT NULL constraint, we must ensure they are handled.
-- DELETE FROM "Task" WHERE "featureId" IS NULL; 

-- 7. Make featureId NOT NULL
ALTER TABLE "Task" ALTER COLUMN "featureId" SET NOT NULL;

-- 8. Drop old constraints and columns from Task
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";
DROP INDEX "Task_projectId_idx";
DROP INDEX "Task_projectId_slug_key";
ALTER TABLE "Task" DROP COLUMN "projectId";

-- 9. Add remaining indexes and constraints
CREATE INDEX "Feature_projectId_idx" ON "Feature"("projectId");
CREATE UNIQUE INDEX "Feature_projectId_slug_key" ON "Feature"("projectId", "slug");
CREATE INDEX "Task_featureId_idx" ON "Task"("featureId");
CREATE UNIQUE INDEX "Task_featureId_slug_key" ON "Task"("featureId", "slug");
ALTER TABLE "Task" ADD CONSTRAINT "Task_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

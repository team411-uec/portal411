-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "addressId" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "entrancedYear" INTEGER,
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "hasKey505" BOOLEAN NOT NULL,
    "hasKeyPictlab" BOOLEAN NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "leftAt" TIMESTAMP(3),
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prefecture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Prefecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

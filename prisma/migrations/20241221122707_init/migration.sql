-- CreateTable
CREATE TABLE `Option` (
    `id` VARCHAR(191) NOT NULL,
    `siteName` VARCHAR(191) NULL,
    `logoUrl` VARCHAR(191) NULL,
    `slice1Url` VARCHAR(191) NULL,
    `slice2Url` VARCHAR(191) NULL,
    `slice3Url` VARCHAR(191) NULL,
    `siteDescription` VARCHAR(191) NULL,
    `descriptionImageUrl` VARCHAR(191) NULL,
    `contactEmail` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone1` VARCHAR(191) NULL,
    `phone2` VARCHAR(191) NULL,
    `contactImageUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inscription` ADD CONSTRAINT `Inscription_formationId_fkey` FOREIGN KEY (`formationId`) REFERENCES `Formation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

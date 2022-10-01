import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CompaniesController } from './controllers/companies/companies.controller';
import { ValorationController } from './controllers/valoration/valoration.controller';
import { CategoriesService } from './services/categories/categories.service';
import { CompaniesService } from './services/companies/companies.service';
import { ValorationService } from './services/valoration/valoration.service';

@Module({
  controllers: [CategoriesController, CompaniesController, ValorationController],
  providers: [CategoriesService, CompaniesService, ValorationService]
})
export class CompaniesModule {}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CompanyDto, UpdateCompanyDto } from 'src/companies/dtos/companies.dto';
import { CompaniesService } from 'src/companies/services/companies/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}
  @Post()
  create(@Body() user: CompanyDto) {
    return this.companyService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateCompanyDto) {
    return this.companyService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  @Get('/companies')
  findAll() {
    return this.companyService.findAll();
  }

  /*@Get('/business')
  search() {
    return this.companyService.find();
  }*/
}

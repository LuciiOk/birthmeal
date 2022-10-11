import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Company } from 'src/companies/schemas/companies.schema';
import { CompanyDto, UpdateCompanyDto } from 'src/companies/dtos/companies.dto';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  findAll() {
    return this.companyModel.find().exec();
  }

  create(data: CompanyDto) {
    const newCompany = new this.companyModel(data);
    return newCompany.save();
  }

  update(id: string, changes: UpdateCompanyDto) {
    const company = this.companyModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!company) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return company;
  }

  remove(id: string) {
    return this.companyModel.findByIdAndDelete(id);
  }
}

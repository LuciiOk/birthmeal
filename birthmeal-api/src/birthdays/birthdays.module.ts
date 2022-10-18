import { Module } from '@nestjs/common';
import { BirthdaysService } from './services/birthdays.service';
import { BirthdaysController } from './controllers/birthdays.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Birthdate, BirthdateSchema } from './schemas/Birthdate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Birthdate.name,
        schema: BirthdateSchema,
      },
    ]),
  ],
  providers: [BirthdaysService],
  controllers: [BirthdaysController],
})
export class BirthdaysModule {}

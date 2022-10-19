import { Module } from '@nestjs/common';
import { BirthdaysService } from './services/birthdays.service';
import { BirthdaysController } from './controllers/birthdays.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Birthdate, BirthdateSchema } from './schemas/Birthdate.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Birthdate.name,
        schema: BirthdateSchema,
      },
    ]),
    AuthModule
  ],
  providers: [BirthdaysService],
  controllers: [BirthdaysController],
})
export class BirthdaysModule {}

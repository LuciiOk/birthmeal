import { Module } from '@nestjs/common';
import { CoordsController } from './controllers/coords/coords.controller';
import { LocationsController } from './controllers/locations/locations.controller';
import { CoordsService } from './services/coords/coords.service';
import { LocationsService } from './services/locations/locations.service';

@Module({
  controllers: [CoordsController, LocationsController],
  providers: [CoordsService, LocationsService]
})
export class LocationsModule {}

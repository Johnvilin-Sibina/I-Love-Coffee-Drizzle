import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}

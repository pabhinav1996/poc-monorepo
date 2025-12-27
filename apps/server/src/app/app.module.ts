import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockDataController } from './mock-data.controller';
import { MockDataService } from './mock-data.service';

@Module({
  imports: [],
  controllers: [AppController, MockDataController],
  providers: [AppService, MockDataService],
})
export class AppModule {}

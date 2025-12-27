import { Controller, Get, Query } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

@Controller()
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Get('dashboard-cards')
  getDashboardCards() {
    return this.mockDataService.getDashboardCards();
  }

  @Get('filters')
  getFilters() {
    return this.mockDataService.getFilters();
  }

  @Get('grid-data')
  getGridData(@Query('count') count: number) {
    return this.mockDataService.getGridData(count || 300);
  }

  @Get('smart-alerts')
  getSmartAlerts(@Query('count') count: number) {
    return this.mockDataService.getSmartAlerts(count || 10);
  }

  @Get('details')
  getDetails(@Query('id') id: string) {
    return this.mockDataService.getDetails(id);
  }
}


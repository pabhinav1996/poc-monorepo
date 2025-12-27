import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DashboardCard, FilterOptions, GridRow, DetailsData, SmartAlert } from '@poc/shared/util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  // Using relative path because proxy.conf.json forwards /api to http://localhost:3000
  // But wait, the server routes are /api/dashboard-cards (from @Controller('') in main.ts global prefix 'api')
  // So client should request /api/dashboard-cards.
  // Proxy maps /api -> http://localhost:3000
  // Request /api/dashboard-cards -> http://localhost:3000/api/dashboard-cards
  // Server handles /api/dashboard-cards.
  // CORRECT.

  getDashboardCards(): Observable<DashboardCard[]> {
    return this.http.get<DashboardCard[]>('/api/dashboard-cards');
  }

  getFilters(): Observable<FilterOptions> {
    return this.http.get<FilterOptions>('/api/filters');
  }

  getGridData(count: number = 300): Observable<GridRow[]> {
    const params = new HttpParams().set('count', count);
    return this.http.get<GridRow[]>('/api/grid-data', { params });
  }

  getDetails(id: string): Observable<DetailsData> {
    const params = new HttpParams().set('id', id);
    return this.http.get<DetailsData>('/api/details', { params });
  }

  getSmartAlerts(count: number = 10): Observable<SmartAlert[]> {
    const params = new HttpParams().set('count', count);
    return this.http.get<SmartAlert[]>('/api/smart-alerts', { params });
  }
}

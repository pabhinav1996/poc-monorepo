import { Injectable, computed, signal, inject } from '@angular/core';
import { SmartAlert } from '@poc/shared/util';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardStore {
  private api = inject(ApiService);

  readonly smartAlerts = signal<SmartAlert[]>([]);
  readonly loading = signal<boolean>(false);

  loadSmartAlerts() {
    this.loading.set(true);
    this.api.getSmartAlerts(10).subscribe({
      next: (alerts) => {
        this.smartAlerts.set(alerts);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}

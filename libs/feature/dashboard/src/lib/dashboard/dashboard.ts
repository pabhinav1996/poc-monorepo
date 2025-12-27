import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DashboardStore } from '@poc/shared/data-access';
import { GuideDrawerComponent } from '@poc/shared/ui';

@Component({
  selector: 'poc-dashboard',
  standalone: true,
  imports: [CommonModule, GuideDrawerComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  private dashboardStore = inject(DashboardStore);

  cards$ = this.api.getDashboardCards();
  smartAlerts = this.dashboardStore.smartAlerts;

  isGuideOpen = false;

  ngOnInit() {
    this.dashboardStore.loadSmartAlerts();
  }

  openGuide() {
    this.isGuideOpen = true;
  }

  getCardDescription(title: string): string {
    const descriptions: Record<string, string> = {
      'Total Alerts': 'All Alerts',
      'All (For TL)': 'All Alerts',
      'New Assigned': 'Total new alert to attend yet.',
      'In Progress': 'Total new alert to attend yet.',
      'Closed': 'Total new alert to attend yet.',
      'Escalated': 'Total new alert to attend yet.',
    };
    return descriptions[title] || 'All Alerts';
  }

  getCardValueClass(title: string): string {
    if (title === 'Escalated') {
      return 'text-red-500';
    }
    return 'text-[#323130]';
  }
}

import { Component, inject, OnInit, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, DashboardStore } from '@poc/shared/data-access';
import { StatCardComponent } from '@poc/shared/ui';
import { GuideDrawerComponent } from '@poc/shared/ui';

@Component({
  selector: 'poc-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, GuideDrawerComponent, StatCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  private dashboardStore = inject(DashboardStore);

  // Convert Observable to Signal
  private cardsSignal = toSignal(this.api.getDashboardCards(), { initialValue: [] });

  // Computed signal for processed cards (enriching data for view)
  processedCards = computed(() => {
    const cards = this.cardsSignal();
    return cards.map(card => ({
      ...card,
      description: this.getCardDescription(card.title),
      valueClass: this.getCardValueClass(card.title)
    }));
  });

  smartAlerts = this.dashboardStore.smartAlerts;

  isGuideOpen = false;

  ngOnInit() {
    this.dashboardStore.loadSmartAlerts();
  }

  openGuide() {
    this.isGuideOpen = true;
  }

  private getCardDescription(title: string): string {
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

  private getCardValueClass(title: string): string {
    if (title === 'Escalated') {
      return 'text-[#a6212a]';
    }
    return 'text-[#4e2683]';
  }
}

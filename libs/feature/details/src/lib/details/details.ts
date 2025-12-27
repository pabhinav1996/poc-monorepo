import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GridStore } from '@poc/shared/data-access';
import { GuideDrawerComponent } from '@poc/shared/ui';

interface Entity {
  name: string;
  identityType: string;
  identity: string;
}

@Component({
  selector: 'poc-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, GuideDrawerComponent],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class DetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  gridStore = inject(GridStore);

  // Get current row data from store
  currentRow = computed(() => {
    const id = this.gridStore.selectedId();
    const rows = this.gridStore.rows();
    return rows.find(r => r.id === id) || null;
  });

  // Tab state
  activeTab: 'overview' | 'disambiguation' | 'alertSummary' = 'disambiguation';
  activeSubTab: 'mainEntity' | 'transactionParties' = 'mainEntity';

  // Panel visibility
  showPanel = true;

  // Guide drawer
  isGuideOpen = false;

  // Toggle states
  flagPartyPairIssue = false;

  // Entity table data
  selectedEntityIndex = 0;
  entities: Entity[] = [
    { name: 'Lorem ipsum', identityType: 'LEI', identity: '' },
    { name: 'ac volutpat', identityType: 'FENERGO', identity: '' },
    { name: 'tellus arcu', identityType: 'CRDS', identity: '' },
    { name: 'rhoncus tellus', identityType: 'RMPM', identity: '' },
    { name: 'interdum faucibus.', identityType: 'New', identity: '' },
  ];

  constructor() {
    // Subscribe to route params to update store
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.gridStore.selectId(id);
      }
    });
  }

  go(id: string | null) {
    if(id) {
      this.router.navigate(['/details', id]);
    }
  }

  /**
   * Parse DD/MM/YYYY format and return formatted date like 'Monday, September 07, 2025'
   */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    
    // Parse DD/MM/YYYY format
    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    
    // Format as 'Monday, September 07, 2025'
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
  }
}

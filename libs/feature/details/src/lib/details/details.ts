import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GridStore } from '@poc/shared/data-access';
import { GuideDrawerComponent, DropdownComponent, DropdownOption } from '@poc/shared/ui';

interface Entity {
  name: string;
  identityType: string;
  identity: string;
}

@Component({
  selector: 'poc-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, GuideDrawerComponent, DropdownComponent],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class DetailsComponent {
  // Static dropdown options
  mainEntityParentOptions: DropdownOption[] = [
    { label: 'Main Party - 1', value: 'Main Party - 1' },
    { label: 'Main Party - 2', value: 'Main Party - 2' }
  ];
  
  identityTypeOptions: DropdownOption[] = [
    { label: 'LEI', value: 'LEI' },
    { label: 'FENERGO', value: 'FENERGO' },
    { label: 'CRDS', value: 'CRDS' },
    { label: 'RMPM', value: 'RMPM' },
    { label: 'New', value: 'New' }
  ];
  
  selectedMainEntityParent = 'Main Party - 1';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  gridStore = inject(GridStore);

  currentRow = computed(() => {
    const id = this.gridStore.selectedId();
    const rows = this.gridStore.rows();
    return rows.find(r => r.id === id) || null;
  });

  activeTab: 'overview' | 'disambiguation' | 'alertSummary' = 'disambiguation';
  activeSubTab: 'mainEntity' | 'transactionParties' = 'mainEntity';

  showPanel = true;

  isGuideOpen = false;

  flagPartyPairIssue = false;

  selectedEntityIndex = 0;
  entities: Entity[] = [
    { name: 'Lorem ipsum', identityType: 'LEI', identity: '' },
    { name: 'ac volutpat', identityType: 'FENERGO', identity: '' },
    { name: 'tellus arcu', identityType: 'CRDS', identity: '' },
    { name: 'rhoncus tellus', identityType: 'RMPM', identity: '' },
    { name: 'interdum faucibus.', identityType: 'New', identity: '' },
  ];

  constructor() {
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

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    
    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
  }
}

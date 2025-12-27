import { Component, input, model, output, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions } from '@poc/shared/util';

export interface AdvanceFiltersState {
  alertIds: string;
  type: string;
  fromDate: string;
  toDate: string;
  priority: string;
  status: string;
  jurisdiction: string;
  riskRating: string;
  scoreMin: number;
  scoreMax: number;
  rulesApplied: number;
  lineOfBusiness: string;
  clientNames: string;
}

@Component({
  selector: 'poc-ops-advanced-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ops-advanced-filters.component.html',
  styleUrl: './ops-advanced-filters.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OpsAdvancedFiltersComponent {
  filters = input.required<FilterOptions | null>();
  todayDate = input<string>(new Date().toISOString().split('T')[0]);
  
  // State Model
  state = model.required<AdvanceFiltersState>();

  // Outputs
  close = output<void>();
  apply = output<void>();
  reset = output<void>();

  // Configuration for the 4 adjacent dropdowns to reduce template repetition
  dropdownFields = computed(() => {
    const f = this.filters();
    return [
      { label: 'Priority', key: 'priority' as keyof AdvanceFiltersState, options: f?.priorities || [] },
      { label: 'Status', key: 'status' as keyof AdvanceFiltersState, options: f?.statuses || [] },
      { label: 'Jurisdiction', key: 'jurisdiction' as keyof AdvanceFiltersState, options: f?.jurisdictions || [] },
      { label: 'Risk Rating', key: 'riskRating' as keyof AdvanceFiltersState, options: f?.riskRatings || [] }
    ];
  });

  onScoreMinChange(value: number) {
    const currentState = this.state();
    if (value > currentState.scoreMax) {
      this.state.update(s => ({ ...s, scoreMin: currentState.scoreMax }));
    }
  }

  onScoreMaxChange(value: number) {
    const currentState = this.state();
    if (value < currentState.scoreMin) {
      this.state.update(s => ({ ...s, scoreMax: currentState.scoreMin }));
    }
  }
}

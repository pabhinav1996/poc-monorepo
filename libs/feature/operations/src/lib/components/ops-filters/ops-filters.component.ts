import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions } from '@poc/shared/util';

@Component({
  selector: 'poc-ops-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ops-filters.component.html',
})
export class OpsFiltersComponent {
  filters = input.required<FilterOptions | null>();
  totalRecords = input.required<number>();

  // Two-way binding models
  alertId = model<string>('');
  priority = model<string>('');
  type = model<string>('');
  status = model<string>('');
  riskRating = model<string>('');
  lineOfBusiness = model<string>('');

  // Events
  filterChange = output<void>();
  reset = output<void>();
  apply = output<void>();

  onFilterChanged() {
    this.filterChange.emit();
  }

  onEnter() {
    this.apply.emit();
  }
}

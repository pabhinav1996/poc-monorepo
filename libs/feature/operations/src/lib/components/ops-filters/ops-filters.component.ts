import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions } from '@poc/shared/util';
import { DropdownComponent, DropdownOption } from '@poc/shared/ui';

@Component({
  selector: 'poc-ops-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent],
  templateUrl: './ops-filters.component.html',
})
export class OpsFiltersComponent {
  filters = input.required<FilterOptions | null>();
  totalRecords = input.required<number>();

  alertId = model<string>('');
  priority = model<string>('');
  type = model<string>('');
  status = model<string>('');
  riskRating = model<string>('');
  lineOfBusiness = model<string>('');

  filterChange = output<void>();
  reset = output<void>();
  apply = output<void>();

  // Helper to convert string arrays to DropdownOption format
  toOptions(values: string[] | undefined): DropdownOption[] {
    return values?.map(v => ({ label: v, value: v })) || [];
  }

  onFilterChanged() {
    this.filterChange.emit();
  }

  onEnter() {
    this.apply.emit();
  }
}

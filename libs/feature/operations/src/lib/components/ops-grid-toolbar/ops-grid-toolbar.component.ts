import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'poc-ops-grid-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ops-grid-toolbar.component.html',
})
export class OpsGridToolbarComponent {
  export = output<void>();
  toggleAdvanced = output<void>();
  bulkAction = output<void>();
}

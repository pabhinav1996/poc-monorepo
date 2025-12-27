import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCard } from '@poc/shared/util';

@Component({
  selector: 'poc-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() card!: DashboardCard;
}

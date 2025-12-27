import { Component, EventEmitter, Input, Output } from '@angular/core';


import { GUIDE_STEPS } from './guide.constants';

@Component({
  selector: 'poc-guide-drawer',
  standalone: true,
  imports: [],
  templateUrl: './guide-drawer.component.html',
  styleUrls: ['./guide-drawer.component.scss'],
})
export class GuideDrawerComponent {
  @Input() isOpen = false;
  @Input() title = 'Operation Guide';
  @Output() close = new EventEmitter<void>();

  guideSteps = GUIDE_STEPS;
}

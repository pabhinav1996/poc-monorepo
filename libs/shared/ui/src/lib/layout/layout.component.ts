import { Component, ViewChild } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { GuideDrawerComponent } from '../guide-drawer/guide-drawer.component';

@Component({
  selector: 'poc-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, SideMenuComponent, GuideDrawerComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isGuideOpen = false;
  isSidebarCollapsed = true;

  @ViewChild(SideMenuComponent) sideMenu!: SideMenuComponent;

  toggleGuide() {
    this.isGuideOpen = !this.isGuideOpen;
  }

  onSidebarCollapsedChange(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  expandSidebar() {
    if (this.sideMenu) {
      this.sideMenu.expand();
    }
  }
}

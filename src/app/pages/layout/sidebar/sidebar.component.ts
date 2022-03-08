import { Component, ViewEncapsulation } from '@angular/core';

import { MenuService } from '@service/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  menus = this.menu.getAll();

  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );

  constructor(private menu: MenuService) {
    this.opened = true;
  }
}

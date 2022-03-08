import { Component, Input } from '@angular/core';

import { MenuItem, ToggleStates } from '../shared/menu.model';

@Component({
  selector: 'cream-sidebar-menu',
  template: `
    <ul class="menu-items">
      <ng-container *ngFor="let item of items">
        <li
          sidebarMenuItem
          [menuItem]="item"
          (toggleSubMenu)="onToggleSubMenu($event)"
          class="menu-item"
        ></li>
      </ng-container>
    </ul>
  `,
})
export class SidebarMenuComponent {
  @Input() tag: string;

  /**
   * List of menu items.
   */
  @Input() items: MenuItem[];

  onToggleSubMenu(item: MenuItem): void {
    item.toggleState =
      item.toggleState == ToggleStates.Expanded
        ? ToggleStates.Collapsed
        : ToggleStates.Expanded;
  }
}

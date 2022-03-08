import {
  Component,
  Input,
  Output,
  DoCheck,
  OnInit,
  EventEmitter,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  group,
} from '@angular/animations';

import { ToggleStates, MenuItem } from '../shared/menu.model';
import { MenuService } from '../shared/menu.service';

@Component({
  selector: '[sidebarMenuItem]',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        ToggleStates.Collapsed,
        style({
          overflow: 'hidden',
          visibility: 'hidden',
          opacity: 0,
          maxHeight: 0,
        })
      ),
      state(
        ToggleStates.Expanded,
        style({
          visibility: 'visible',
          opacity: 1,
          maxHeight: '3000px',
        })
      ),
      transition(
        `${ToggleStates.Collapsed} => ${ToggleStates.Expanded}`,
        animate(
          '0.5s 0s ease-in-out',
          style({ visibility: 'visible', opacity: 1, maxHeight: '3000px' })
        )
      ),
      transition(
        `${ToggleStates.Expanded} => ${ToggleStates.Collapsed}`,
        group([
          animate(
            '275ms 0s ease-out',
            style({ visibility: 'hidden', opacity: 0 })
          ),
          animate('0.28s 0s ease-out', style({ maxHeight: 0 })),
        ])
      ),
    ]),
    trigger('toggleIcon', [
      state(ToggleStates.Collapsed, style({})),
      state(ToggleStates.Expanded, style({ transform: 'rotate(90deg)' })),
      transition(
        `${ToggleStates.Collapsed} <=> ${ToggleStates.Expanded}`,
        animate(300)
      ),
    ]),
  ],
})
export class SidebarMenuItemComponent implements OnInit, DoCheck {
  @Input() menuItem = <MenuItem>null;

  @Output() toggleSubMenu = new EventEmitter<MenuItem>();

  toggleState: ToggleStates;

  constructor(protected menuService: MenuService) {}

  ngOnInit(): void {
    if (!this.menuItem.toggleState) {
      // 默认关闭
      this.menuItem.toggleState = ToggleStates.Collapsed;
    }
  }

  ngDoCheck(): void {
    this.toggleState = this.menuItem.toggleState;
  }

  onToggleSubMenu(e: Event, item: MenuItem): void {
    e.preventDefault();
    this.toggleSubMenu.emit(item);
  }
}

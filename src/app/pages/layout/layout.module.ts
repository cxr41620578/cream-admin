import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { SidebarMenuItemComponent } from './sidebar-menu-item/sidebar-menu-item.component';

import { ThemeService, THEME_OPTIONS } from '../../theme/shared/theme.service';
import { MenuInternalService, MenuService } from './shared/menu.service';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarMenuComponent,
    SidebarMenuItemComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    MenuInternalService, MenuService, ThemeService, { provide: THEME_OPTIONS, useValue: { name: 'default' } }
  ]
})
export class LayoutModule { }

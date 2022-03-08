import { Injectable } from '@angular/core';

import { ToggleStates, MenuItem } from '../pages/layout/shared/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getAll(): MenuItem[] {
    return [
      {
        name: 'E-commerce',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        home: true,
        toggleState: ToggleStates.Collapsed,
        children: [
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
        ]
      },
      {
        name: 'Layout',
        icon: 'layout-outline',
        children: [
          {
            name: 'Stepper',
            link: '/pages/layout/stepper',
          },
        ]
      }
    ];
  }
}

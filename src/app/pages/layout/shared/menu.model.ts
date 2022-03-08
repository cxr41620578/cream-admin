export enum ToggleStates {
  Expanded = 'expanded',
  Collapsed = 'collapsed'
}

export class MenuItem {
  /**
   * 菜单名称
   */
  name: string;

  /**
   * 菜单路由
   */
  route?: string;

  /**
   * 菜单图标
   */
  icon?: string;

  toggleState?: ToggleStates;

  link?: string;

  badge?: MenuItemTag;

  label?: MenuItemTag;

  children?: MenuItem[];

  parent?: MenuItem;

  selected?: boolean;

  home?: boolean;

  fragment?: string;

  pathMatch?: 'full' | 'prefix' = 'full';

  static getParents(item: MenuItem): MenuItem[] {
      const parents = [];

      let parent = item.parent;
      while (parent) {
          parents.unshift(parent);
          parent = parent.parent;
  }

  return parents;
  }

  static isParent(item: MenuItem, possibleChild: MenuItem): boolean {
      return possibleChild.parent
          ? possibleChild.parent === item || this.isParent(item, possibleChild.parent)
          : false;
  }
}

export interface MenuItemTag {
  color: string; // Background Color
  value: string;
}

export interface MenuBag {
  tag: string;
  item: MenuItem;
}
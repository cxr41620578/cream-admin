import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Observable, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

import { MenuItem, MenuBag } from'./menu.model';

const itemClick = new Subject<MenuBag>();
const addItems = new ReplaySubject<{ tag: string; items: MenuItem[] }>(1);

const submenuToggle = new ReplaySubject<MenuBag>(1);
const navigateHome = new ReplaySubject<{ tag: string }>(1);
const getSelectedItem
  = new ReplaySubject<{ tag: string; listener: BehaviorSubject<MenuBag> }>(1);
const itemSelect = new ReplaySubject<MenuBag>(1);

const collapseAll = new ReplaySubject<{ tag: string }>(1);

@Injectable()
export class MenuInternalService {

    constructor(private location: Location) {}

    prepareItems(items: MenuItem[]): void {
        const defaultItem = new MenuItem();
        items.forEach((i) => {
            this.applyDefaults(i, defaultItem);
            this.setParent(i);
        });
    }

    selectFromUrl(items: MenuItem[], tag: string, collapseOther = false): void {
        const selectedItem = this.findItemByUrl(items);
        if (selectedItem) {
            this.selectItem(selectedItem, items, collapseOther, tag);
        }
    }

    selectItem(item: MenuItem, items: MenuItem[], collapseOther = false, tag: string): void {
        const unselectedItems = this.resetSelection(items);
        const collapsedItems = collapseOther ? this.collapseItems(items) : [];
    
        for (const parent of MenuItem.getParents(item)) {
          parent.selected = true;
          // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
          if (!unselectedItems.includes(parent)) {
            this.itemSelect(parent, tag);
          }
    
        //   const wasNotExpanded = !parent.expanded;
        //   parent.expanded = true;
          const i = collapsedItems.indexOf(parent);
          // emit event only for items that weren't expanded before.
          // 'collapsedItems' contains items that were expanded, so no need to emit event.
          // in case 'collapseOther' is false, 'collapsedItems' will be empty,
          // so also check if item isn't expanded already ('wasNotExpanded').
        //   if (i === -1 && wasNotExpanded) {
        //     this.submenuToggle(parent, tag);
        //   } else {
        //     collapsedItems.splice(i, 1);
        //   }
        }
    
        item.selected = true;
        // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
        if (!unselectedItems.includes(item)) {
          this.itemSelect(item, tag);
        }
    
        // remaining items which wasn't expanded back after expanding all currently selected items
        for (const collapsedItem of collapsedItems) {
          this.submenuToggle(collapsedItem, tag);
        }
      }

    onAddItem(): Observable<{ tag: string; items: MenuItem[] }> {
        return addItems.pipe(share());
      }

      onNavigateHome(): Observable<{ tag: string }> {
        return navigateHome.pipe(share());
      }

      onCollapseAll(): Observable<{ tag: string }> {
        return collapseAll.pipe(share());
      }

      onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<MenuBag> }> {
        return getSelectedItem.pipe(share());
      }

    itemClick(item: MenuItem, tag?: string): void {
        console.log(item);
        itemClick.next({ tag, item });
    }

    collapseAll(items: MenuItem[], tag: string, except?: MenuItem): void {
        const collapsedItems = this.collapseItems(items, except);

        for (const item of collapsedItems) {
            this.submenuToggle(item, tag);
        }
    }

    submenuToggle(item: MenuItem, tag?: string): void {
        submenuToggle.next({tag, item});
    }

    itemSelect(item: MenuItem, tag?: string): void {
        itemSelect.next({tag, item});
    }
    
    private resetSelection(items: MenuItem[]): MenuItem[] {
        const unselectedItems = [];

        for (const item of items) {
            if (item.selected) {
            unselectedItems.push(item);
            }
            item.selected = false;

            if (item.children) {
            unselectedItems.push(...this.resetSelection(item.children));
            }
        }

        return unselectedItems;
    }

    private collapseItems(items: MenuItem[], except?: MenuItem): MenuItem[] {
        const collapsedItems = [];
    
        for (const item of items) {
          if (except && (item === except || MenuItem.isParent(item, except))) {
            continue;
          }
    
        //   if (item.expanded) {
        //     collapsedItems.push(item)
        //   }
        //   item.expanded = false;
    
          if (item.children) {
            collapsedItems.push(...this.collapseItems(item.children));
          }
        }
    
        return collapsedItems;
    }

    private applyDefaults(item, defaultItem) {
        const menuItem = { ...item };
        Object.assign(item, defaultItem, menuItem);
        item.children && item.children.forEach(child => {
            this.applyDefaults(child, defaultItem);
        });
    }

    private setParent(item: MenuItem) {
        item.children && item.children.forEach(child => {
            child.parent = item;
            this.setParent(child);
        });
    }

    
    private findItemByUrl(items: MenuItem[]): MenuItem | undefined {
        let selectedItem;

        items.some(item => {
            if (item.children) {
            selectedItem = this.findItemByUrl(item.children);
            }
            if (!selectedItem && this.isSelectedInUrl(item)) {
            selectedItem = item;
            }

            return selectedItem;
        });

        return selectedItem;
    }

    private isSelectedInUrl(item: MenuItem): boolean {
        const exact: boolean = item.pathMatch === 'full';
        const link: string = item.link;
    
        const isSelectedInPath = exact
        ? this.isUrlPathEqual(this.location.path(), link)
        : this.isUrlPathContain(this.location.path(), link);
    
        if (isSelectedInPath && item.fragment != null) {
        return exact
            ? this.isFragmentEqual(this.location.path(true), item.fragment)
            : this.isFragmentContain(this.location.path(true), item.fragment);
        }
    
        return isSelectedInPath;
    }

    private isUrlPathEqual(path: string, link: string): boolean {
        const locationPath = this.getPathPartOfUrl(path);
        return link === locationPath;
      }
      
    private isUrlPathContain(path: string, link: string): boolean {
    const locationPath = this.getPathPartOfUrl(path);
    const endOfUrlSegmentRegExp = /\/|^$/;
    return locationPath.startsWith(link) &&
        locationPath.slice(link.length).charAt(0).search(endOfUrlSegmentRegExp) !== -1;
    }
    
    private getPathPartOfUrl(url): string {
    return url.match(/.*?(?=[?;#]|$)/)[0];
    }
    
    private getFragmentPartOfUrl(url: string): string {
    const matched = url.match(/#(.+)/);
    return matched ? matched[1] : '';
    }
    
    private isFragmentEqual(path: string, fragment: string): boolean {
    return this.getFragmentPartOfUrl(path) === fragment;
    }
    
    private isFragmentContain(path: string, fragment: string): boolean {
    return this.getFragmentPartOfUrl(path).includes(fragment);
    }
}

@Injectable()
export class MenuService {
    onSubmenuToggle(): Observable<MenuBag> {
        return submenuToggle.pipe(share());
    }
}

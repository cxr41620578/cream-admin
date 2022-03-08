import { Injectable, InjectionToken, Inject } from '@angular/core';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, filter, pairwise, distinctUntilChanged, startWith, share } from 'rxjs/operators';

export interface ThemeOptions {
  name: string;
}

export const THEME_OPTIONS = new InjectionToken<ThemeOptions>('Cream Theme Options');

export interface ThemeNode {

  name: string;

  previous: string;
}

@Injectable()
export class ThemeService {

  currentTheme: string;
  private themeChanges$ = new ReplaySubject<ThemeNode>(1);

  constructor(@Inject(THEME_OPTIONS) protected options: ThemeOptions) {
    console.log(options);
    if (options && options.name) {
        this.changeTheme(options.name);
    }
  }
  
  changeTheme(name: string): void {
    this.themeChanges$.next({ name, previous: name });
    this.currentTheme = name;
  }

  onThemeChange(): Observable<ThemeNode> {
    return this.themeChanges$.pipe(share());
  }
}

import { Component, OnDestroy, Renderer2, Inject } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ThemeService, ThemeNode } from '../../theme/shared/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  private destroy$ = new Subject<void>();

  constructor(protected themeService: ThemeService,
    protected renderer: Renderer2) {
    this.themeService.onThemeChange()
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((theme: ThemeNode) => {
      const body = document.getElementsByTagName('body')[0];
      if (theme.previous) {
        this.renderer.removeClass(body, `cream-theme-${theme.previous}`);
      }
      this.renderer.addClass(body, `cream-theme-${theme.name}`);
    });
  }
}

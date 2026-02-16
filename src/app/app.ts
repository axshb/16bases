
import { Component, inject, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

import { ThemeService } from './services/theme.service';
import { SidebarComponent } from './components/sidebar.component';
import { FetchComponent } from './components/fetch.component';
import { EditorComponent } from './components/editor.component';
import { BrowserComponent } from './components/browser.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, FetchComponent, EditorComponent, BrowserComponent],
  template: `
    <div class="flex min-h-screen bg-base00 text-base05 font-mono">
      <app-sidebar />

      <main class="grid flex-1 gap-5 p-5 grid-cols-[1.2fr_1fr] grid-rows-[auto_1fr]">

        <div class="col-start-1 row-start-1">
          <app-fetch />
        </div>

        <div class="col-start-1 row-start-2 overflow-hidden rounded-lg border border-base02 min-h-0">
          <app-editor />
        </div>

        <div class="col-start-2 row-start-1 row-span-2 bg-base00 rounded-lg border border-base02 overflow-hidden min-h-0">
          <app-browser />
        </div>

      </main>
    </div>
  `
})
export class App {
  public theme = inject(ThemeService);

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {

        const vars = this.theme.scheme();
        const root = this.document.documentElement;

        Object.entries(vars).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value as string);
        });
      }
    });
  }

}


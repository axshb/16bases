import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    <div [style]="theme.cssVars()" class="layout">
      <app-sidebar />

      <main class="preview-grid">
        <div class="area-fetch">
          <app-fetch />
        </div>

        <div class="area-code">
          <app-editor />
        </div>

        <div class="area-browser">
          <app-browser />
        </div>
      </main>
    </div>
  `,
  styles: `
    .layout { display: flex; min-height: 100vh; background: var(--base00); color: var(--base05); font-family: ui-monospace, monospace; }

    .preview-grid {
      display: grid;
      flex: 1;
      gap: 20px;
      padding: 20px;
      /* Left side is wider for code/fetch, right side for browser preview */
      grid-template-columns: 1.2fr 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        "fetch browser"
        "code  browser";
    }

    .area-fetch { grid-area: fetch; }
    .area-code  { grid-area: code; overflow: hidden; border-radius: 8px; border: 1px solid var(--base02); }

    .area-browser {
      grid-area: browser;
      background: var(--base01);
      border-radius: 8px;
      border: 1px solid var(--base02);
      overflow: hidden;
    }

    /* Browser Mock Styling */
    .browser-mock header { background: var(--base02); padding: 10px; }
    .address-bar { background: var(--base00); padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; opacity: 0.7; }
    .browser-content { padding: 40px; }
    .browser-content h2 { color: var(--base0D); margin-top: 0; }
    .skeleton-line { height: 10px; background: var(--base02); margin-bottom: 15px; border-radius: 2px; }
  `
})
export class App {
  public theme = inject(ThemeService);
}

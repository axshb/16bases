import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { SchemeService } from '../services/schemes.service';

@Component({
  selector: 'app-browser',
  standalone: true,
  template: `
    <div class="scheme-grid">
      @for (item of filteredSchemes(); track item.id) {
        <div class="scheme-card" (click)="onClick(item)">
          <div class="card-info">
            <span class="name">{{ item.name }}</span>
            <span class="badge" [class.builtin]="item.builtin">
              {{ item.builtin ? 'Built-in' : 'User' }}
            </span>
          </div>
          <div class="type-tag">{{ item.theme_type }}</div>
        </div>
      } @empty {
        <div class="loading">Fetching from Neon...</div>
      }
    </div>
  `,
  styles: `
  .filter-bar { display: flex; gap: 10px; margin-top: 10px; }
  .search-input {
    flex: 1; background: var(--base00); border: 1px solid var(--base03);
    color: var(--base05); padding: 5px 10px; border-radius: 4px; font-size: 0.8rem;
  }
  .toggle-group { display: flex; border: 1px solid var(--base03); border-radius: 4px; overflow: hidden; }
  .toggle-group button {
    background: var(--base01); border: none; color: var(--base05);
    padding: 5px 10px; font-size: 0.7rem; cursor: pointer;
  }
  .toggle-group button.active { background: var(--base0D); color: var(--base00); }

  .scheme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; padding: 15px; }
  .scheme-card {
    background: var(--base00); border: 1px solid var(--base02);
    padding: 12px; border-radius: 6px; position: relative;
    transition: transform 0.1s; cursor: pointer;
  }
  .scheme-card:hover { transform: translateY(-2px); border-color: var(--base0D); }
  .card-info .name { display: block; font-size: 1rem; font-weight: bold; margin-bottom: 4px; }
  .badge { font-size: 0.75rem; padding: 2px 4px; border-radius: 3px; background: var(--base02); opacity: 0.8; }
  .badge.builtin { color: var(--base0B); border: 1px solid var(--base0B); }
  .type-tag { position: absolute; top: 5px; right: 5px; font-size: 0.6rem; opacity: 0.4; }
  .type-tag, .badge {
  pointer-events: none;
  }
  `
})
export class BrowserComponent {
  private theme = inject(ThemeService);
  public schemeService = inject(SchemeService);

  public filteredSchemes = computed(() => {
    return this.schemeService.schemes();
  });

  onClick(selectedTheme: any) {
    Object.entries(selectedTheme.colors).forEach(([key, color]) => {
      this.theme.updateColor(key, color as string);
    });
  }
}




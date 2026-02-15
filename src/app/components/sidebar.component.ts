import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside class="sidebar">
      <h1>16bases</h1>
      <h3>Palette</h3>
      <div class="grid">
        @for (item of colorList(); track item.key) {
          <div class="swatch">
            <input type="color" [value]="item.value" (input)="update(item.key, $event)">
            <span>{{ item.key }}</span>
          </div>
        }
      </div>
    </aside>
  `,
  styles: `
    .sidebar {
      width: 200px;
      padding: 1rem;
      border-right: 1px solid #444;
      height: 100vh;
    }
    .grid {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 10px;
     }
    .swatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.7rem;
      font-family: monospace;
    }
    input[type="color"] {
      width: 100%;
      height: 70px;
      border: none;
      cursor: pointer;
      background: none;
    }

    h3 { margin-bottom: 1rem; font-size: 0.9rem; opacity: 0.7; }
  `
})
export class SidebarComponent {
  private theme = inject(ThemeService);

  colorList = computed(() =>
    Object.entries(this.theme.scheme()).map(([key, value]) => ({ key, value }))
  );

  update(key: string, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.theme.updateColor(key, val);
  }
}

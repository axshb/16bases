
import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { SchemeService } from '../services/schemes.service';

@Component({
  selector: 'app-browser',
  standalone: true,
  template: `
    <div class="h-full flex flex-col bg-base00 border border-base02 rounded-lg overflow-hidden relative">
      <div class="flex gap-2.5 mt-2.5 px-4">
        <input class="flex-1 bg-base00 border border-base03 text-base05 px-2.5 py-1 rounded text-sm outline-none focus:border-base0D" placeholder="Search...">
        <div class="flex border border-base03 rounded overflow-hidden">
           <button class="bg-base0D text-base00 px-2.5 py-1 text-[0.7rem] cursor-pointer border-none">All</button>
           <button class="bg-base01 text-base05 px-2.5 py-1 text-[0.7rem] cursor-pointer border-none hover:bg-base02">Dark</button>
           <button class="bg-base01 text-base05 px-2.5 py-1 text-[0.7rem] cursor-pointer border-none hover:bg-base02">Light</button>
        </div>
      </div>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 p-4 overflow-y-auto">
        @for (item of filteredSchemes(); track item.id) {
          <div class="bg-base00 border border-base02 p-3 rounded-md relative cursor-pointer transition-transform hover:-translate-y-0.5 hover:border-base0D" (click)="onClick(item)">
            <div class="block text-base font-bold mb-1">{{ item.name }}</div>

            <span class="text-xs px-1 py-0.5 rounded opacity-80"
                  [class]="item.builtin ? 'text-base0B border border-base0B' : 'bg-base02'">
              {{ item.builtin ? 'Built-in' : 'User' }}
            </span>

            <div class="absolute top-1 right-1 text-[0.6rem] opacity-40 pointer-events-none">{{ item.theme_type }}</div>
          </div>
        } @empty {
          <div class="text-base05 p-4">Fetching from Neon...</div>
        }
      </div>
    </div>
  `,
  styles: `:host { display: block; height: 100%; overflow: hidden; }`
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

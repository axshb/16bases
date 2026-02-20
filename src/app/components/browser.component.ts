
import { Component, computed, inject } from '@angular/core';
import { Base16Scheme, ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-browser',
  standalone: true,
  template: `
    <div class="h-full flex flex-col bg-base00 relative">
      <div class="flex-none flex gap-2.5 p-4 border-b border-base02">
        <input class="flex-1 bg-base01 border border-base03 text-base05 px-2.5 py-1.5 rounded text-sm outline-none focus:border-base0D" placeholder="Search themes...">
        <div class="flex border border-base03 rounded overflow-hidden">
           <button class="bg-base0D text-base00 px-3 py-1 text-[0.7rem] font-bold">All</button>
           <button class="bg-base01 text-base05 px-3 py-1 text-[0.7rem] hover:bg-base02">Dark</button>
           <button class="bg-base01 text-base05 px-3 py-1 text-[0.7rem] hover:bg-base02">Light</button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto min-h-0">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 p-4">
          @for (item of filteredSchemes(); track item.id) {
            <div class="group bg-base01 border border-base02 p-4 rounded-md cursor-pointer transition-all hover:border-base0D hover:bg-base02" (click)="onClick(item)">
              <div class="flex justify-between items-start mb-2">
                <div class="text-sm font-bold text-base05 truncate pr-2">{{ item.name }}</div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-[0.6rem] px-1.5 py-0.5 rounded-sm uppercase font-mono tracking-tighter"
                      [class]="item.builtin ? 'text-base0B border border-base0B/30' : 'bg-base03 text-base05'">
                  {{ item.builtin ? 'Built-in' : 'User' }}
                </span>

                <div class="flex gap-1">
                  <div class="w-2 h-2 rounded-full" [style.background]="item.colors.base08"></div>
                  <div class="w-2 h-2 rounded-full" [style.background]="item.colors.base0B"></div>
                  <div class="w-2 h-2 rounded-full" [style.background]="item.colors.base0D"></div>
                  <div class="w-2 h-2 rounded-full" [style.background]="item.colors.base0E"></div>
                </div>
              </div>
            </div>
          } @empty {
            <div class="text-base05 p-8 text-center opacity-50 italic">No themes found...</div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
      max-height: 95vh;
    }
  `
})
export class BrowserComponent {
  private theme = inject(ThemeService);

  public filteredSchemes = computed(() => {
    return this.theme.schemes();
  });

  onClick(selectedTheme: any) {

    let selectedColors: Base16Scheme = selectedTheme.colors;

    // db returns a stringified json object we need to parse
    // it may make more sense to move this to the service
    if (!selectedTheme.builtin) {
      selectedColors = JSON.parse(selectedTheme.colors);
    }

    console.log(selectedColors);
    Object.entries(selectedColors).forEach(([key, color]) => {
      this.theme.updateColor(key, color as string);
    });
  }
}

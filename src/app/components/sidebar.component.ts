
import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside class="w-[200px] h-screen border-r border-base02 p-4 flex flex-col gap-4 bg-base00 text-base05">
      <h1 class="text-xl font-bold">Theme Editor</h1>

      <div class="grid grid-cols-2 gap-2.5">
        @for (item of colorList(); track item.key) {
          <div class="flex flex-col items-center text-[0.7rem] font-mono">
            <div class="relative w-full h-[70px] overflow-hidden rounded border border-base02">
              <input
                type="color"
                [value]="item.value"
                (input)="update(item.key, $event)"
                class="absolute -top-1 -left-1 w-[150%] h-[150%] cursor-pointer border-none bg-transparent p-0"
              >
            </div>
            <span>{{ item.key }}</span>
          </div>
        }
      </div>
    </aside>
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

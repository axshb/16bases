import { Component, computed, inject, signal } from '@angular/core'; // Added signal
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
            <div class="relative w-full h-[6vh] overflow-hidden rounded border border-base02">
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

        <div class="col-span-2 flex flex-col gap-3 mt-4 border-t border-base02 pt-4">
         <input
            #nameInput
            type="text"
            class="bg-base01 p-2 text-[0.8rem] rounded border"
            placeholder="Theme name"
          />

        <input
            #creatorInput
            type="text"
            class="bg-base01 p-2 text-[0.8rem] rounded border"
            placeholder="Creator name..."
            value="Guest"
            rounded border
          />

         <button
            (click)="handleUpload(nameInput.value, creatorInput.value)"
            class="bg-base0D text-base00 px-3 py-2 text-[0.8rem] font-bold cursor-pointer rounded border">
            Upload Custom Theme
            rounded border
         </button>
        </div>

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

  handleUpload(name: string, creator: string) {
    if (!name.trim()) {
      alert('Please enter a theme name first!');
      return;
    }

    this.theme.uploadTheme(name, creator);
  }
}

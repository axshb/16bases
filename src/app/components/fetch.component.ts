
import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-fetch',
  standalone: true,
  template: `
    <div class="bg-base00 border border-base02 p-5 rounded-lg shadow-xl flex gap-6 font-mono text-base05">

      <div class="flex items-center justify-center shrink-0">
        <img src="/ascii-art-text.png" alt="16bases logo" class="w-[200px] text-base0D"/>
      </div>

      <div class="flex flex-col gap-1">
        <div class="font-bold text-base0B">user<span class="text-base05">@</span>16bases</div>
        <div class="text-base05 opacity-30">-----------------------</div>

        <div class="flex"><span class="font-bold text-base0D w-24">OS:</span> 16bases WebOS 1.0 x86_64</div>
        <div class="flex"><span class="font-bold text-base0D w-24">Host:</span> Node.js 24</div>
        <div class="flex"><span class="font-bold text-base0D w-24">Uptime:</span> 4 hours, 12 mins</div>
        <div class="flex"><span class="font-bold text-base0D w-24">Packages:</span> 214 (npm)</div>
        <div class="flex"><span class="font-bold text-base0D w-24">Shell:</span> zsh 5.9</div>
        <div class="flex"><span class="font-bold text-base0D w-24">DE:</span> Angular</div>
        <div class="flex"><span class="font-bold text-base0D w-24">WM:</span> DOM</div>
        <div class="flex"><span class="font-bold text-base0D w-24">Terminal:</span> xterm.js</div>
        <div class="flex"><span class="font-bold text-base0D w-24">CPU:</span> V8 JavaScript Engine (8) @ 3.40GHz</div>
        <div class="flex"><span class="font-bold text-base0D w-24">GPU:</span> WebGL Renderer</div>

        <div class="flex gap-1.5 mt-3">
          @for (num of ['08','09','0A','0B','0C','0D','0E','0F']; track num) {
            <div class="w-[18px] h-[18px] rounded-sm" [style.background]="'var(--base' + num + ')'"></div>
          }
        </div>
      </div>
    </div>
  `
})
export class FetchComponent {
  public theme = inject(ThemeService);
}

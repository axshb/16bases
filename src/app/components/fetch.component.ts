
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

        <div class="flex"><span class="font-bold text-base0D ">OS:&emsp;</span> 16bases WebOS 1.0 x86_64</div>
        <div class="flex"><span class="font-bold text-base0D ">Host:&emsp;</span> Node.js 24</div>
        <div class="flex"><span class="font-bold text-base0D ">Uptime:&emsp;</span> 4 hours, 12 mins</div>
        <div class="flex"><span class="font-bold text-base0D ">Packages:&emsp;</span> 214 (npm)</div>
        <div class="flex"><span class="font-bold text-base0D ">Shell:&emsp;</span> zsh 5.9</div>
        <div class="flex"><span class="font-bold text-base0D ">DE:&emsp;</span> Angular</div>
        <div class="flex"><span class="font-bold text-base0D ">WM:&emsp;</span> DOM</div>
        <div class="flex"><span class="font-bold text-base0D ">Terminal:&emsp;</span> xterm.js</div>
        <div class="flex"><span class="font-bold text-base0D ">CPU:&emsp;</span> V8 JavaScript Engine (8) @ 3.40GHz</div>
        <div class="flex"><span class="font-bold text-base0D ">GPU:&emsp;</span> WebGL Renderer</div>

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

import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-fetch',
  standalone: true,
  template: `
    <div class="terminal">
      <div class="ascii-art">
        <img src="/ascii-art-text.png" alt="16bases logo" style="width:200px;"/>
      </div>
      <div class="stats">
        <div class="user">user<span>&#64;</span>16bases</div>
        <div class="sep">-----------------------</div>

        <div class="line"><span class="key">OS:</span> 16bases WebOS 1.0 x86_64</div>
        <div class="line"><span class="key">Host:</span> Node.js 24</div>
        <div class="line"><span class="key">Uptime:</span> 4 hours, 12 mins</div>
        <div class="line"><span class="key">Packages:</span> 214 (npm)</div>
        <div class="line"><span class="key">Shell:</span> zsh 5.9</div>
        <div class="line"><span class="key">DE:</span> Angular</div>
        <div class="line"><span class="key">WM:</span> DOM</div>
        <div class="line"><span class="key">Terminal:</span> xterm.js</div>
        <div class="line"><span class="key">CPU:</span> V8 JavaScript Engine (8) @ 3.40GHz</div>
        <div class="line"><span class="key">GPU:</span> WebGL Renderer</div>
        <div class="palette">
          @for (num of ['08','09','0A','0B','0C','0D','0E','0F']; track num) {
            <div class="pill" [style.background]="'var(--base' + num + ')'"></div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .terminal {
      background: var(--base00);
      border: 1px solid var(--base02);
      padding: 20px;
      border-radius: 8px;
      display: flex;
      gap: 25px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .ascii {
      color: var(--base0D);
      font-weight: bold;
      line-height: 1.2;
    }
    .stats {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .user { color: var(--base0B); font-weight: bold; }
    .sep { color: var(--base05); opacity: 0.3; }
    .key { color: var(--base0D); font-weight: bold; margin-right: 8px; }

    .palette { display: flex; gap: 6px; margin-top: 12px; }
    .pill { width: 18px; height: 18px; border-radius: 3px; }
  `
})
export class FetchComponent {
  public theme = inject(ThemeService);
}

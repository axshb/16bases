
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  standalone: true,
  template: `
    <div class="terminal">
      <div class="code" [innerHTML]="safeCode"></div>
    </div>
  `,
  styles: `
  .terminal {
      background: var(--base01);
      border: 1px solid var(--base02);
      padding: 20px;
      border-radius: 8px;
      display: flex;
      gap: 25px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-size: 1rem;
    }

    /* Mapping Shiki output to your variables */
    :host ::ng-deep .shiki {
      background: transparent !important;
      margin: 0;
      --shiki-foreground: var(--base05);
      --shiki-token-keyword: var(--base0E);
      --shiki-token-string: var(--base0B);
      --shiki-token-type: var(--base0A);
      --shiki-token-function: var(--base0D);
      --shiki-token-comment: var(--base03);
    }
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class EditorComponent {
  // big placeholder...
  @Input() codeString: string = `<pre class="shiki css-variables" style="background-color:var(--shiki-background);color:var(--shiki-foreground)" tabindex="0"><code><span class="line"><span style="color:var(--shiki-token-keyword)">import</span><span style="color:var(--shiki-foreground)"> { </span><span style="color:var(--shiki-token-type)">Component</span><span style="color:var(--shiki-foreground)"> } </span><span style="color:var(--shiki-token-keyword)">from</span><span style="color:var(--shiki-foreground)"> </span><span style="color:var(--shiki-token-string)">'@angular/core'</span><span style="color:var(--shiki-foreground)">;</span></span><br><span class="line"><span style="color:var(--shiki-foreground)">@</span><span style="color:var(--shiki-token-function)">Component</span><span style="color:var(--shiki-foreground)">({</span></span><br><span class="line"><span style="color:var(--shiki-foreground)">  selector: </span><span style="color:var(--shiki-token-string)">'app-root'</span><span style="color:var(--shiki-foreground)">,</span></span><br><span class="line"><span style="color:var(--shiki-foreground)">  template: </span><span style="color:var(--shiki-token-string)">\`&lt;h1&gt;Hello World&lt;/h1&gt;\`</span><span style="color:var(--shiki-foreground)">,</span></span><br><span class="line"><span style="color:var(--shiki-foreground)">})</span></span><br><span class="line"><span style="color:var(--shiki-token-keyword)">export</span><span style="color:var(--shiki-foreground)"> </span><span style="color:var(--shiki-token-keyword)">class</span><span style="color:var(--shiki-foreground)"> </span><span style="color:var(--shiki-token-type)">AppComponent</span><span style="color:var(--shiki-foreground)"> {</span></span><br><span class="line"><span style="color:var(--shiki-foreground)">  data = </span><span style="color:var(--shiki-token-keyword)">\${</span><span style="color:var(--shiki-foreground)">someValue</span><span style="color:var(--shiki-token-keyword)">}</span><span style="color:var(--shiki-foreground)">;</span></span><br><span class="line"><span style="color:var(--shiki-foreground)">}</span></span></code></pre>`;

  constructor(private sanitizer: DomSanitizer) {}

  get safeCode(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.codeString);
  }
}

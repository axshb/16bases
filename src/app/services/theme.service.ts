import { Injectable, signal, inject, computed } from '@angular/core';

export interface Base16Scheme {
  [key: string]: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {

  public scheme = signal<Base16Scheme>({
    base00: '#1e1e2e',
    base01: '#181825',
    base02: '#313244',
    base03: '#45475a',
    base04: '#585b70',
    base05: '#cdd6f4',
    base06: '#f5e0dc',
    base07: '#b4befe',
    base08: '#f38ba8',
    base09: '#fab387',
    base0A: '#f9e2af',
    base0B: '#a6e3a1',
    base0C: '#94e2d5',
    base0D: '#89b4fa',
    base0E: '#cba6f7',
    base0F: '#f2cdcd',
  });

  public updateColor(key: string, value: string) {
    this.scheme.update(prev => ({ ...prev, [key]: value }));
  }

  public cssVars = computed(() => {
    const currentScheme = this.scheme();
    const styles: Record<string, string> = {};

    for (const key in currentScheme) {
      const value = currentScheme[key];
      styles[`--${key}`] = value;
    }

    return styles;
  });
}


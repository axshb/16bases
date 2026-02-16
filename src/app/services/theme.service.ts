import { Injectable, signal, inject, computed } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

import builtIns from '../../../public/themes_seed.json'

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

  public updateScheme(newScheme: Base16Scheme) {
    const keys = Object.keys(this.scheme());
    const next = { ...this.scheme() };

    keys.forEach((key, i) => next[key] = newScheme[i]);

    this.scheme.set(next);
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

  private http = inject(HttpClient);

  private userSchemes = toSignal(
    this.http.get<any[]>('/api/scheme-data'),
    { initialValue: [] }
  );

  private builtInSchemes = signal<any[]>(builtIns);

  // to do: consider sets (pass by reference might make this annoying)
  // also, haviing userSchemes called on demand rather than every time
  // which would involve avoiding having schemes set up like this, because
  // components that call schemes will make an api request every time
  public schemes = computed (() => {
    return [...this.builtInSchemes(), ...this.userSchemes()]
  })
}


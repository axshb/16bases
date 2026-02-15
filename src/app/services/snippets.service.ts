
import { Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class SnippetService {
  private snippets: Record<string, string> = {
    typescript: TS_CODE,
    rust: RS_CODE,
    python: PY_CODE
  };

  public languages = Object.keys(this.snippets);

  private _code = signal(this.snippets['typescript']);
  private _lang = signal('typescript');

  public code = this._code.asReadonly();
  public lang = this._lang.asReadonly();

  public selectLanguage(lang: string) {
    if (this.snippets[lang]) {
      this._lang.set(lang);
      this._code.set(this.snippets[lang]);
    }
  }
}

const TS_CODE = `export interface Config {
  version: number;
  active: boolean;
  metadata: Record<string, string>;
}

export class ConfigManager {
  private cache = new Map<string, Config>();

  load(data: Config): void {
    this.cache.set('root', data);
  }
}`;

const RS_CODE = `#[derive(Debug, Clone)]
pub struct Config {
    pub version: u32,
    pub active: bool,
}

impl Config {
    pub fn new(version: u32) -> Self {
        Self { version, active: true }
    }
}`;

const PY_CODE = `class ConfigManager:
    def __init__(self, name="Mocha"):
        self.name = name
        self.active = True

    def get_status(self) -> str:
        return f"Status: {self.active}"`;

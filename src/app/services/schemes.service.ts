import { Injectable, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SchemeService {

  private http = inject(HttpClient);

  private userSchemes = toSignal(
    this.http.get<any[]>('/api/scheme-data'),
    { initialValue: [] }
  );

  private builtInSchemes = toSignal(
    this.http.get<any[]>('/themes_seed.json'),
    { initialValue: [] }
  );

  // to do: consider sets (pass by reference might make this annoying)
  public schemes = computed (() => {
    return [...this.builtInSchemes(), ...this.userSchemes()]
  })

}

import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SchemeService {

  private http = inject(HttpClient);

  public schemes = toSignal(
    this.http.get<any[]>('/api/scheme-data'),
    { initialValue: [] }
  );
}

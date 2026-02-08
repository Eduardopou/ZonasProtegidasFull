import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, timer, throwError } from 'rxjs';
import { retryWhen, mergeMap, finalize, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = 'http://localhost:8080/api/gemini/generate';
  private inflight = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  // Genera texto usando el modelo Gemini
  generateText(textoDelPrompt: string): Observable<any> {
    const body = { prompt: textoDelPrompt };
    const key = JSON.stringify(body);
    const existing = this.inflight.get(key);
    if (existing) {
      return existing;
    }
    // Lógica de reintentos y deduplicación
    const req$ = this.http.post<any>(this.apiUrl, body).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((err: HttpErrorResponse, i: number) => {
            if (err?.status === 429 && i < 3) {
              const retryAfterHeader = err.headers?.get?.('Retry-After');
              let delayMs = 0;
              if (retryAfterHeader) {
                const secs = Number(retryAfterHeader);
                if (!Number.isNaN(secs)) {
                  delayMs = Math.max(1000, secs * 1000);
                }
              }
              if (!delayMs) {
                delayMs = Math.pow(2, i) * 1000 + Math.floor(Math.random() * 300);
              }
              return timer(delayMs);
            }
            return throwError(() => err);
          })
        )
      ),
      finalize(() => this.inflight.delete(key)),
      shareReplay(1)
    );
    this.inflight.set(key, req$);
    return req$;
  }
}


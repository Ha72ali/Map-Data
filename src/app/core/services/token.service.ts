import { Injectable, signal } from '@angular/core';

/**
 * Holds the JWT access token in memory (a signal). Not persisted to
 * localStorage — on reload we silently re-obtain it via the refresh cookie.
 */
@Injectable({ providedIn: 'root' })
export class TokenService {
  readonly token = signal<string | null>(null);

  set(token: string | null): void {
    this.token.set(token);
  }

  clear(): void {
    this.token.set(null);
  }
}

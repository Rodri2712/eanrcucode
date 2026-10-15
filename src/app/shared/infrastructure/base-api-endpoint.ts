import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseApiEndpoint {
  constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
  ) {}

  getAll<T>(): Observable<T[]> {
    return this.http.get<T[]>(this.endpointUrl);
  }

  getById<T>(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.endpointUrl}/${id}`);
  }

  create<TRequest, TResponse>(request: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(this.endpointUrl, request);
  }

  update<TRequest, TResponse>(id: number | string, request: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.endpointUrl}/${id}`, request);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`);
  }
}

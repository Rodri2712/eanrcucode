import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { ServiceOrderAssembler } from '../assembler/service-order-assembler';
import { ServiceOrderResponse } from '../response/service-order-response';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderApi extends BaseApiEndpoint {
  private readonly assembler = inject(ServiceOrderAssembler);

  constructor() {
    super(inject(HttpClient), environment.apiBaseUrl + '/service-orders');
  }

  override getAll<T>(): Observable<T[]> {
    return this.http
      .get<ServiceOrderResponse[]>(this.endpointUrl)
      .pipe(map((responses) => this.assembler.toEntities(responses))) as Observable<T[]>;
  }

  override getById<T>(id: number | string): Observable<T> {
    return this.http
      .get<ServiceOrderResponse>(this.endpointUrl + '/' + id)
      .pipe(map((response) => this.assembler.toEntity(response))) as Observable<T>;
  }
}

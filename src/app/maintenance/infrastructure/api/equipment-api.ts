import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { EquipmentAssembler } from '../assembler/equipment-assembler';
import { EquipmentResponse } from '../response/equipment-response';

@Injectable({
  providedIn: 'root',
})
export class EquipmentApi extends BaseApiEndpoint {
  private readonly assembler = inject(EquipmentAssembler);

  constructor() {
    super(inject(HttpClient), environment.apiBaseUrl + '/equipments');
  }

  override getAll<T>(): Observable<T[]> {
    return this.http
      .get<EquipmentResponse[]>(this.endpointUrl)
      .pipe(map((responses) => this.assembler.toEntities(responses))) as Observable<T[]>;
  }

  override getById<T>(id: number | string): Observable<T> {
    return this.http
      .get<EquipmentResponse>(this.endpointUrl + '/' + id)
      .pipe(map((response) => this.assembler.toEntity(response))) as Observable<T>;
  }
}

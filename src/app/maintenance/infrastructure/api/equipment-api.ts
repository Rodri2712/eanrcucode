import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class EquipmentApi extends BaseApiEndpoint {
  constructor() {
    super(inject(HttpClient), `${environment.apiBaseUrl}/equipments`);
  }
}

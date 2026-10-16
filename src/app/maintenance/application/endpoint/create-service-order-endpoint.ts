import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateServiceOrderRequest } from '../request/create-service-order-request';
import { CreateServiceOrderResponse } from '../response/create-service-order-response';
import { MaintenanceService } from '../maintenance-service';

@Injectable({
  providedIn: 'root',
})
export class CreateServiceOrderEndpoint {
  private readonly maintenanceService = inject(MaintenanceService);

  execute(request: CreateServiceOrderRequest): Observable<CreateServiceOrderResponse> {
    return this.maintenanceService.createServiceOrder(request);
  }
}

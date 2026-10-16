import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOrder } from '../../domain/model/service-order';
import { MaintenanceService } from '../maintenance-service';

@Injectable({
  providedIn: 'root',
})
export class GetServiceOrdersEndpoint {
  private readonly maintenanceService = inject(MaintenanceService);

  execute(): Observable<ServiceOrder[]> {
    return this.maintenanceService.getServiceOrders();
  }
}

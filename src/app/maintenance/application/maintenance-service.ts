import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../domain/model/equipment';
import { ServiceOrder } from '../domain/model/service-order';
import { EquipmentApi } from '../infrastructure/api/equipment-api';
import { ServiceOrderApi } from '../infrastructure/api/service-order-api';
import { CreateServiceOrderRequest } from './request/create-service-order-request';
import { CreateServiceOrderResponse } from './response/create-service-order-response';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private readonly equipmentApi = inject(EquipmentApi);
  private readonly serviceOrderApi = inject(ServiceOrderApi);

  getEquipments(): Observable<Equipment[]> {
    return this.equipmentApi.getAll<Equipment>();
  }

  getEquipmentById(id: number): Observable<Equipment> {
    return this.equipmentApi.getById<Equipment>(id);
  }

  getServiceOrders(): Observable<ServiceOrder[]> {
    return this.serviceOrderApi.getAll<ServiceOrder>();
  }

  getServiceOrderById(id: number): Observable<ServiceOrder> {
    return this.serviceOrderApi.getById<ServiceOrder>(id);
  }

  createServiceOrder(request: CreateServiceOrderRequest): Observable<CreateServiceOrderResponse> {
    return this.serviceOrderApi.create<CreateServiceOrderRequest, CreateServiceOrderResponse>(
      request,
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../domain/model/equipment';
import { ServiceOrder } from '../domain/model/service-order';
import { EquipmentApi } from '../infrastructure/api/equipment-api';
import { ServiceOrderApi } from '../infrastructure/api/service-order-api';

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

  createServiceOrder(serviceOrder: Omit<ServiceOrder, 'id'>): Observable<ServiceOrder> {
    return this.serviceOrderApi.create<Omit<ServiceOrder, 'id'>, ServiceOrder>(serviceOrder);
  }
}

import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Equipment } from '../../domain/model/equipment';
import { ServiceOrder } from '../../domain/model/service-order';
import { CreateServiceOrderRequest } from '../request/create-service-order-request';
import { MaintenanceService } from '../maintenance-service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceStore {
  private readonly maintenanceService = inject(MaintenanceService);

  private readonly equipmentState = signal<Equipment[]>([]);
  private readonly serviceOrderState = signal<ServiceOrder[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly equipments = this.equipmentState.asReadonly();
  readonly serviceOrders = this.serviceOrderState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  readonly nextHighPriorityOrder = computed(
    () =>
      this.serviceOrderState()
        .filter((order) => order.priority === 'HIGH')
        .sort(
          (first, second) =>
            new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime(),
        )[0] ?? null,
  );

  loadEquipments(): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.maintenanceService
      .getEquipments()
      .pipe(finalize(() => this.loadingState.set(false)))
      .subscribe({
        next: (equipments) => this.equipmentState.set(equipments),
        error: () => this.errorState.set('Failed to load equipment.'),
      });
  }

  loadServiceOrders(): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.maintenanceService
      .getServiceOrders()
      .pipe(finalize(() => this.loadingState.set(false)))
      .subscribe({
        next: (orders) => this.serviceOrderState.set(orders),
        error: () => this.errorState.set('Failed to load service orders.'),
      });
  }

  createServiceOrder(request: CreateServiceOrderRequest): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.maintenanceService
      .createServiceOrder(request)
      .pipe(finalize(() => this.loadingState.set(false)))
      .subscribe({
        next: (response) => {
          this.serviceOrderState.update((orders) => [...orders, response]);
        },
        error: () => this.errorState.set('Failed to create service order.'),
      });
  }
}

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
  private readonly loadingEquipmentsState = signal(false);
  private readonly loadingServiceOrdersState = signal(false);
  private readonly creatingServiceOrderState = signal(false);
  private readonly equipmentErrorState = signal<string | null>(null);
  private readonly serviceOrderErrorState = signal<string | null>(null);
  private readonly createServiceOrderErrorState = signal<string | null>(null);

  readonly equipments = this.equipmentState.asReadonly();
  readonly serviceOrders = this.serviceOrderState.asReadonly();
  readonly loadingEquipments = this.loadingEquipmentsState.asReadonly();
  readonly loadingServiceOrders = this.loadingServiceOrdersState.asReadonly();
  readonly creatingServiceOrder = this.creatingServiceOrderState.asReadonly();
  readonly equipmentError = this.equipmentErrorState.asReadonly();
  readonly serviceOrderError = this.serviceOrderErrorState.asReadonly();
  readonly createServiceOrderError = this.createServiceOrderErrorState.asReadonly();

  readonly loading = computed(
    () =>
      this.loadingEquipmentsState() ||
      this.loadingServiceOrdersState() ||
      this.creatingServiceOrderState(),
  );
  readonly error = computed(
    () =>
      this.equipmentErrorState() ??
      this.serviceOrderErrorState() ??
      this.createServiceOrderErrorState(),
  );

  readonly highPriorityOrderCount = computed(
    () => this.serviceOrderState().filter((order) => order.priority === 'HIGH').length,
  );
  readonly serviceOrderCount = computed(() => this.serviceOrderState().length);
  readonly equipmentCount = computed(() => this.equipmentState().length);

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
    this.loadingEquipmentsState.set(true);
    this.equipmentErrorState.set(null);

    this.maintenanceService
      .getEquipments()
      .pipe(finalize(() => this.loadingEquipmentsState.set(false)))
      .subscribe({
        next: (equipments) => this.equipmentState.set(equipments),
        error: () => this.equipmentErrorState.set('maintenance.errors.load-equipment'),
      });
  }

  loadServiceOrders(): void {
    this.loadingServiceOrdersState.set(true);
    this.serviceOrderErrorState.set(null);

    this.maintenanceService
      .getServiceOrders()
      .pipe(finalize(() => this.loadingServiceOrdersState.set(false)))
      .subscribe({
        next: (orders) => this.serviceOrderState.set(orders),
        error: () => this.serviceOrderErrorState.set('maintenance.errors.load-service-orders'),
      });
  }

  createServiceOrder(request: CreateServiceOrderRequest): void {
    this.creatingServiceOrderState.set(true);
    this.createServiceOrderErrorState.set(null);

    this.maintenanceService
      .createServiceOrder(request)
      .pipe(finalize(() => this.creatingServiceOrderState.set(false)))
      .subscribe({
        next: (response) => {
          this.serviceOrderState.update((orders) => [...orders, response]);
        },
        error: () =>
          this.createServiceOrderErrorState.set('maintenance.errors.create-service-order'),
      });
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MaintenanceStore } from '../../../application/store/maintenance-store';

@Component({
  selector: 'app-service-orders',
  imports: [TranslatePipe, DatePipe],
  templateUrl: './service-orders.html',
  styleUrl: './service-orders.css',
})
export class ServiceOrders implements OnInit {
  protected readonly maintenanceStore = inject(MaintenanceStore);

  ngOnInit(): void {
    this.maintenanceStore.loadEquipments();
    this.maintenanceStore.loadServiceOrders();
  }
}

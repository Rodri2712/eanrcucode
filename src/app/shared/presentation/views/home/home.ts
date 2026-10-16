import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MaintenanceStore } from '../../../../maintenance/application/store/maintenance-store';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly maintenanceStore = inject(MaintenanceStore);

  ngOnInit(): void {
    this.maintenanceStore.loadEquipments();
    this.maintenanceStore.loadServiceOrders();
  }
}

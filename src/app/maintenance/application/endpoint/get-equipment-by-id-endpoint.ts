import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../domain/model/equipment';
import { MaintenanceService } from '../maintenance-service';

@Injectable({
  providedIn: 'root',
})
export class GetEquipmentByIdEndpoint {
  private readonly maintenanceService = inject(MaintenanceService);

  execute(id: number): Observable<Equipment> {
    return this.maintenanceService.getEquipmentById(id);
  }
}

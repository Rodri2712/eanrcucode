import { Injectable } from '@angular/core';
import { Equipment } from '../../domain/model/equipment';
import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { EquipmentResponse } from '../response/equipment-response';

@Injectable({
  providedIn: 'root',
})
export class EquipmentAssembler extends BaseAssembler<EquipmentResponse, Equipment> {
  override toEntity(response: EquipmentResponse): Equipment {
    return {
      id: Number(response.id),
      name: response.name,
      code: response.code,
      location: response.location,
      costPerHour: response.costPerHour,
      defaultAction: response.defaultAction,
    };
  }
}

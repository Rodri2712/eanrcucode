import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../domain/model/service-order';
import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { ServiceOrderResponse } from '../response/service-order-response';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderAssembler extends BaseAssembler<ServiceOrderResponse, ServiceOrder> {
  override toEntity(response: ServiceOrderResponse): ServiceOrder {
    return {
      id: Number(response.id),
      issueId: response.issueId,
      equipmentId: response.equipmentId,
      priority: response.priority,
      status: response.status,
      neededAction: response.neededAction,
      createdAt: response.createdAt,
    };
  }
}

import { BaseResponse } from '../../../shared/infrastructure/base-response';
import { ServiceOrderPriority, ServiceOrderStatus } from '../../domain/model/service-order';

export interface ServiceOrderResponse extends BaseResponse {
  issueId: number;
  equipmentId: number;
  priority: ServiceOrderPriority;
  status: ServiceOrderStatus;
  neededAction: string;
  createdAt: string;
}

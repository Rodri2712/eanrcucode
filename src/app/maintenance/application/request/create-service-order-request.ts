import { ServiceOrderPriority, ServiceOrderStatus } from '../../domain/model/service-order';

export interface CreateServiceOrderRequest {
  issueId: number;
  equipmentId: number;
  priority: ServiceOrderPriority;
  status: ServiceOrderStatus;
  neededAction: string;
  createdAt: string;
}

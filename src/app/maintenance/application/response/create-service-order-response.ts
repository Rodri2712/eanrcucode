import { ServiceOrderPriority, ServiceOrderStatus } from '../../domain/model/service-order';

export interface CreateServiceOrderResponse {
  id: number;
  issueId: number;
  equipmentId: number;
  priority: ServiceOrderPriority;
  status: ServiceOrderStatus;
  neededAction: string;
  createdAt: string;
}

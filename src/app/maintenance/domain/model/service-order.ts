export type ServiceOrderPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export type ServiceOrderStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ServiceOrder {
  id: number;
  issueId: number;
  equipmentId: number;
  priority: ServiceOrderPriority;
  status: ServiceOrderStatus;
  neededAction: string;
  createdAt: string;
}

import { ServiceOrder } from '../../domain/model/service-order';

export interface GetServiceOrdersResponse {
  serviceOrders: ServiceOrder[];
}

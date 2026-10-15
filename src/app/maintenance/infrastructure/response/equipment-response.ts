import { BaseResponse } from '../../../shared/infrastructure/base-response';

export interface EquipmentResponse extends BaseResponse {
  name: string;
  code: string;
  location: string;
  costPerHour: number;
  defaultAction: string;
}

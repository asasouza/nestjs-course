import { Expose, Transform } from 'class-transformer';
import { capitalize } from '../../utils/capitalize';

export class ReportDTO {
  @Expose()
  id: number;
  
  @Transform(({ obj }) => capitalize(obj.make))
  @Expose()
  make: string;

  @Transform(({ obj }) => capitalize(obj.model))
  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}

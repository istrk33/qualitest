import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customer: string;

  products: [];
}

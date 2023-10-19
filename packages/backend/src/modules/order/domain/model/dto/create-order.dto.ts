import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customer: string;

  @IsArray()
  products: string[];
}

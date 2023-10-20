import { IsArray, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateOrderDto {

  @IsString()
  customer: string;


  @IsArray()
  products: string[];
}

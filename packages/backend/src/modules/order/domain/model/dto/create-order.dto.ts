import { IsArray, IsString ,IsDate,IsNumber} from 'class-validator';

export class CreateOrderDto {
  @IsDate()
  startDate:Date;
  
  @IsDate()
  endDate:Date;

  @IsString()
  customer: string;

  @IsArray()
  products: string[];
}

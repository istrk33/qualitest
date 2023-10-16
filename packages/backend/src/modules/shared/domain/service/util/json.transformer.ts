import { ValueTransformer } from 'typeorm';

export class JsonTransformer implements ValueTransformer {
  to(value: any): any {
    return JSON.stringify(value);
  }

  from(value: any): any {
    return value;
  }
}

import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class Exception extends Error {
  constructor(
    readonly type: ExceptionTypeEnum,
    message: string,
  ) {
    super(message);
  }
}

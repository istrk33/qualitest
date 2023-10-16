import { PostgresErrorCode } from '@src/modules/database/postgres-error-codes.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

interface ResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

export class PostgresErrorHandler {
  getError(error: ResponseError) {
    if (error.code === PostgresErrorCode.UniqueViolation) {
      throw new HttpException(`Une ressource avec ce titre existe déjà : ${error.message}`, HttpStatus.BAD_REQUEST);
    }

    if (error.code === PostgresErrorCode.MissingRequiredField) {
      throw new HttpException(`Un champs est manquant: ${error.message}`, HttpStatus.BAD_REQUEST);
    }

    throw new HttpException(`Il y a eu une erreur, veuillez re-essayer: ${error.message} `, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

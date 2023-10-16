import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('message')) {
        message = (
          exceptionResponse as {
            message: string;
          }
        ).message;
      }
    } else if (exception instanceof Exception) {
      switch (exception.type) {
        case ExceptionTypeEnum.NotFound:
          status = HttpStatus.NOT_FOUND;
          break;
        case ExceptionTypeEnum.Forbidden:
          status = HttpStatus.FORBIDDEN;
          break;
        case ExceptionTypeEnum.BadRequest:
          status = HttpStatus.BAD_REQUEST;
          break;
        case ExceptionTypeEnum.Unauthorized:
          status = HttpStatus.UNAUTHORIZED;
          break;
        case ExceptionTypeEnum.InternalServerError:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }

    response.status(status).json({
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

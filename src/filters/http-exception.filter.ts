import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as any;
    const status = exception.getStatus();

    response.status(status).json({
      status_code: status,
      error: exceptionResponse.error,
      message: exceptionResponse.message ?? exceptionResponse,
    });
  }
}

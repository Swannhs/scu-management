import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionEnvelopeFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = isHttp ? exception.getResponse() : 'Internal Server Error';
    const message =
      typeof exceptionResponse === 'string' ? exceptionResponse : ((exceptionResponse as any).message ?? 'Unexpected error');

    response.status(status).json({
      success: false,
      error: {
        code: status === 400 ? 'BAD_REQUEST' : status === 401 ? 'UNAUTHORIZED' : status === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR',
        message,
        details: typeof exceptionResponse === 'object' ? exceptionResponse : undefined,
      },
      meta: { requestId: request.requestId, timestamp: new Date().toISOString() },
    });
  }
}

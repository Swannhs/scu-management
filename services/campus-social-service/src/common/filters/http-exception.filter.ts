import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as any).message ?? 'Unexpected error');

    const code =
      typeof exceptionResponse === 'object' && (exceptionResponse as any).errorCode
        ? (exceptionResponse as any).errorCode
        : this.defaultCode(status);

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        details: typeof exceptionResponse === 'object' ? exceptionResponse : undefined,
      },
      meta: {
        requestId: request.requestId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  private defaultCode(status: number): string {
    if (status === HttpStatus.BAD_REQUEST) return 'BAD_REQUEST';
    if (status === HttpStatus.UNAUTHORIZED) return 'UNAUTHORIZED';
    if (status === HttpStatus.FORBIDDEN) return 'FORBIDDEN';
    if (status === HttpStatus.NOT_FOUND) return 'NOT_FOUND';
    return 'INTERNAL_ERROR';
  }
}

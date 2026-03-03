export class ApiError {
  code: string;
  message: string;
  details?: any;
}

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: ApiError;

  static success<T>(data: T, meta?: any): ApiResponse<T> {
    return {
      success: true,
      data,
      meta,
    };
  }

  static error(code: string, message: string, details?: any): ApiResponse<any> {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
    };
  }
}

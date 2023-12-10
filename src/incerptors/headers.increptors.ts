// your.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class headerIncereptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Modify response headers
        const response = context.switchToHttp().getResponse();
        response.header('Access-Control-Allow-Credentials', 'true');
        return data;
      }),
    );
  }
}

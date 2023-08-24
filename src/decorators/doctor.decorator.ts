import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { DoctorPayload } from 'src/types/types';

export const Doctor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.doctor as DoctorPayload;
  },
);

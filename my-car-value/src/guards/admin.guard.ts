import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { currentUser } = context.switchToHttp().getResponse();
    if (!currentUser) {
      return false;
    }

    return currentUser.admin;
  }
}

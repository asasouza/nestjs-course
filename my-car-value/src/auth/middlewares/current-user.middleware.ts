import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, respose: Response, next: NextFunction) {
      const { userId } = request.session || {};

      if (userId) {
        const user = await this.usersService.findOne(userId);
        // @ts-ignore
        request.currentUser = user;
      }
      next();
  }
}

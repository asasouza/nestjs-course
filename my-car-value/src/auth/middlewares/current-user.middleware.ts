import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, respose: Response, next: NextFunction) {
      const { userId } = request.session || {};

      if (userId) {
        const user = await this.usersService.findOne(userId);

        request.currentUser = user;
      }
      next();
  }
}

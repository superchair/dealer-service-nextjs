import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Auth0Scopes } from '../decorators/auth0-scopes';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class Auth0 extends AuthGuard('auth0') {
  private context: ExecutionContext

  constructor(
    private readonly reflector: Reflector,
  ) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context
    return super.canActivate(context)
  }

  handleRequest(err, jwtToken, _info) {
    if(err || !jwtToken) throw err || new UnauthorizedException()

    const requiredScopes = this.reflector.get<string[]>(Auth0Scopes, this.context.getHandler())
    const userScopes = jwtToken.scope.split(' ') as JwtPayload['scope']

    if (requiredScopes && !requiredScopes.every((requiredScope) => userScopes.includes(requiredScope))) {
      throw new ForbiddenException('Not Allowed')
    }

    return jwtToken
  }
}
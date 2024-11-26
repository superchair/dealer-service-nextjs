import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>(
          'AUTH0_ISSUER',
        )}.well-known/jwks.json`,
      }),

      jwtFromRequest: function(request) {
        // prefer `bearer <token>` but accept `token` as well
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
        return token ?? ExtractJwt.fromHeader('authorization')(request)
      },
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: configService.get<string>('AUTH0_ISSUER'),
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
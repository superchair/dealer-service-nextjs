import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwksClient } from "jwks-rsa";
import { verify } from "jsonwebtoken";
import { Reflector } from "@nestjs/core";
import { configDotenv } from "dotenv";
import { Auth0 } from "./auth0.decorator";

@Injectable()
export class Auth0Guard implements CanActivate {
  private readonly jwksRsaClient: JwksClient
  private readonly issuer: string
  private readonly audience: string

  constructor(
    private readonly reflector: Reflector,
  ) {
    console.log('Auth0Guard constructor')

    // Load environment variables
    configDotenv()
    this.issuer = process.env.AUTH0_ISSUER!
    this.audience = process.env.AUTH0_AUDIENCE!
    const jwksUri: string = new URL('.well-known/jwks.json', this.issuer).href

    this.jwksRsaClient = new JwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const scopes = this.reflector.get<string[]>(Auth0, context.getHandler())
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('No token provided')
    }

    const getJwksKey = (header: any, callback: any): void => {
      this.jwksRsaClient.getSigningKey(header.kid, function(err, key: any) {
        err && callback(err)
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey)
      });
    }

    return new Promise((resolve, reject) => {
      verify(token, getJwksKey, function(err: any, decoded: any) {
        if (err) {
          reject(new UnauthorizedException(err))
        } else {
          if (decoded.aud != this.audience) {
            reject(new UnauthorizedException('Invalid token'))
          }
          if (decoded.iss != this.issuer) {
            reject(new UnauthorizedException('Invalid token'))
          }

          if (scopes && scopes.length > 0) {
            const tokenScopes: Array<string> = decoded.scope.split(' ')
            const allowed = scopes.every((requiredScope) => tokenScopes.includes(requiredScope))
            if (!allowed) {
              reject(new UnauthorizedException('Invalid scopes'))
            }
          }
          resolve(true)
        }
      }.bind(this))
    })
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // TODO: We should accept both `bearer <token>` and `<token>`
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
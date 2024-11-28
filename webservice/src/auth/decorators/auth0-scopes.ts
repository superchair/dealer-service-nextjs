import { Reflector } from "@nestjs/core";

export const Auth0Scopes = Reflector.createDecorator<string[]>();
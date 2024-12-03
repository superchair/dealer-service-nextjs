import { JsonObject } from "@dealer-service/common";

export interface JwtPayload extends JsonObject {
  iss?: string;
  sub?: string;
  aud?: string[];
  iat?: number;
  exp?: number;
  azp?: string;
  scope?: string;
}
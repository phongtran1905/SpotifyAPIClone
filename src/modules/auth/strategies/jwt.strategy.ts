import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { accessTokenPublicKey } from 'src/constraints/jwt.constrant';
import { AccessTokenPayload } from 'src/utils/types/access-token-payload.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenPublicKey,
    });
  }

  async validate(payload: AccessTokenPayload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

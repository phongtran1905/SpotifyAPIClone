import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { refreshTokenPublicKey } from 'src/constraints/jwt.constrant';
import { RefreshTokenPayload } from 'src/utils/types/refresh-token-payload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  private logger = new Logger(RefreshTokenStrategy.name);
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshTokenPublicKey,
    });
  }

  async validate(payload: RefreshTokenPayload) {
    this.logger.log('Validation was executed');

    if (!payload.sessionId) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import config from 'src/config';
import { PayloadToken } from '../models/Payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(
    @Inject(config.KEY)
    readonly configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: PayloadToken) {
    return payload;
  }
}
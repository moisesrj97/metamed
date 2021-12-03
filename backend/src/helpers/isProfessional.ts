import { UnauthorizedException } from '@nestjs/common';
import { JwtInterface } from './validateJwt';

export function isProfessional(decodedToken: JwtInterface) {
  if (decodedToken.role !== 'Professional') {
    throw new UnauthorizedException('Invalid token');
  }
}

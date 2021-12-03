import { UnauthorizedException } from '@nestjs/common';
import { JwtInterface } from './validateJwt';

export function isPatient(decodedToken: JwtInterface) {
  if (decodedToken.role !== 'Patient') {
    throw new UnauthorizedException('Invalid token');
  }
}

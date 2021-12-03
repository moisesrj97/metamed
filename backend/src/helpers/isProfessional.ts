import { JwtInterface } from './validateJwt';

export function isProfessional(decodedToken: JwtInterface) {
  if (decodedToken.role !== 'Professional') {
    throw new Error('Invalid token');
  }
}

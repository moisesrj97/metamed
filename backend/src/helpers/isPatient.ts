import { JwtInterface } from './validateJwt';

export function isPatient(decodedToken: JwtInterface) {
  if (decodedToken.role !== 'Patient') {
    throw new Error('Invalid token');
  }
}

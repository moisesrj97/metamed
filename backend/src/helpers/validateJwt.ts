import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtInterface {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function validateJwt(token: string): JwtInterface {
  if (!token.includes('Bearer')) {
    throw new UnauthorizedException('Invalid token');
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    return decoded as JwtInterface;
  } catch (err) {
    throw new UnauthorizedException('Invalid token');
  }
}

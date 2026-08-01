import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tbs_group_secure_jwt_secret_key_2026'
);

export interface JWTPayload {
  userId: number;
  empCode: string;
  name: string;
  roleId: number;
  roleCode: string;
  roleLevel: number;
  departmentId: number | null;
  departmentCode: string | null;
  [key: string]: unknown;
}

/**
 * Sign a JWT token containing user role & department scope
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET_KEY);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
}

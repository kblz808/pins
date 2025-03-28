import { hash, verify } from '@felix/bcrypt'

export async function hashPassword(password: string) {
  return await hash(password);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await verify(password, hashedPassword);
}

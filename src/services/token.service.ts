import { generateKeys, sign, verify } from 'paseto-ts/v4';

export default class AuthService{
  private secretKey:string;
  private publicKey:string;
  
  constructor() {
    const { secretKey, publicKey } = generateKeys('public');
    this.secretKey = secretKey;
    this.publicKey = publicKey;
  }

  createToken(username: string) : string {
    const payload = {username: username};
    let token: string;

    try {
      token = sign(this.secretKey, payload);
    } catch (error) {
      console.log(error);
      return ''
    }

    return token;
  }

  verifyToken(token: string) : boolean {
    try {
      const { payload } = verify(this.publicKey, token, {validatePayload: true});
      if (payload.username! == 'alex') {
        return true;
      }
      return false;
    } catch (_) {
      return false
    }
    
  }
}

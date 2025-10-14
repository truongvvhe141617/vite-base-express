import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IUser } from "../models/user";

class Service {
  generateToken = (user: IUser) => {
    const secret: Secret = process.env.JWT_SECRET || "default_secret";
    const expiresIn: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN || "15d") as SignOptions["expiresIn"];

    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      { expiresIn }
    );
  };

  signApiKeyToken = async (user: IUser) => {
    const token = this.generateToken(user);
    return token;
  };
}

const apiKeyService = new Service();
export default apiKeyService;

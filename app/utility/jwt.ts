import jwt from "jsonwebtoken";
import { UserEntity } from "../user/userEntity";
export class JwtToken {
     createToken(id: string, username: string): string {
          const token = jwt.sign(
               { _id: id, username: username },
               process.env.SECRET_KEY || "abc", ///temprory TOKEN_KEY
               {
                    expiresIn: "1h",
               }
          );
          return token;
     }
}
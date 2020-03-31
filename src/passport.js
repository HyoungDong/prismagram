 import passport from "passport";
 import { Strategy , ExtractJwt } from "passport-jwt";
 import dotenv from "dotenv";
 import path from "path";
import { prisma } from "../generated/prisma-client";

dotenv.config({ path: path.resolve(__dirname, ".env") })

 const jwtOptions = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //Authorization 헤더에서 jwt를 찾는 역할을 한다.
    secretOrKey:process.env.JWT_SECRET
  
 };
 //done : 사용자를 찾았을때 호줄하는 함수. 
 const verifyUser = async (payload, done) =>{ 
    try {
         const user = prisma.user({id: payload.id});
         if(user !== null){ 
             return done(null,user);
         }else{
             return done(null,false);
         }
    } catch (error) {
        return done(error,false);
    }
 }

 passport.use(new Strategy(jwtOptions,verifyUser)); // jwt를 가져와서 해석하고 확인하는 작업들.
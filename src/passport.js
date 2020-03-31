 import passport from "passport";
 import JwtStrategy from "passport-jwt";
 import dotenv from "dotenv";
 import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") })

 const jwtOptions = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    //Authorization 헤더에서 jwt를 찾는 역할을 한다.
    secret:process.env.JWT_SECRET
  
 };
 //done : 사용자를 찾았을때 호줄하는 함수.
 const verifyUser = (payload, done) =>{ 

 }

 passport.use(new JwtStrategy(jwtOptions,verifyUser));
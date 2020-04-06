 import passport from "passport";
 import { Strategy , ExtractJwt } from "passport-jwt";
 import { prisma } from "../generated/prisma-client";


 const jwtOptions = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //Authorization 헤더에서 jwt를 찾는 역할을 한다.
    secretOrKey:process.env.JWT_SECRET
 };
 //done : 사용자를 찾았을때 호줄하는 함수. 
 const verifyUser = async (payload, done) =>{ 
    try {
         const user = await prisma.user({id: payload.id});
         console.log(user.id);
         if(user !== null){ 
             return done(null,user);
         }else{
             return done(null,false);
         }
    } catch (error) {
        return done(error,false);
    }
 }


export const authenticateJwt = (req,res,next) =>passport.authenticate("jwt",{session : false},(error, user)=>{
    if(user){
        req.user = user; 
        /*VerifyUser 에서 사용자 정보를 받아온 후에 사용자가 존재한다면 그 사용자 정보를 req 객체에 붙여준다.
        express 에서는 미들웨어를 지나서 라우트가 실행된다 토큰을 받아서, 해석하고, 사용자를 찾고, 존재한다면 req 객체에 추가한 후 graphql 함수를 실행한다.
        따라서 로그인이 되어 있다면 모든 graphql 요청에 사용자 정보가 추가되어서 요청된다.*/               
    }
    next();
})(req,res,next); // IIFE 문법 --> authenticateJwt 가 return 하는 함수 Fn 을 Fn(req, res, next)로 실행한다는 의미
//미들웨어 함수이다 -> req, res, next 를 인자로 받는다. 

 passport.use(new Strategy(jwtOptions,verifyUser)); // jwt를 가져와서 해석하고 확인하는 작업들.
 passport.initialize();
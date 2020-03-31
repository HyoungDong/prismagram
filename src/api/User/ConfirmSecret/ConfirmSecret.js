import { prisma } from "../../../../generated/prisma-client";
import { GenerateToken } from "../../../util";

export default {
    Mutation:{
        ConfirmSecret: async(_,args) =>{
            const { email, secret} = args;
            const user = await prisma.user({email});
            if(user.loginSecret === secret){
                //JWT
                const token = GenerateToken(user.id);
                return token;
            }else{
                throw Error("Wrong email/secret !")
            }
        }
    }
}
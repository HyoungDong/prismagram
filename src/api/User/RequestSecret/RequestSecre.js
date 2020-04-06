import { GenerateSecret, sendSecretMail } from "../../../util";
import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        RequestSecret: async(_,args,{request}) =>{
            console.log(request);
            const { email } = args;
            const loginSecret =  GenerateSecret();
            console.log(request);
            //console.log(loginSecret); 
            try{
                throw Error();
                await sendSecretMail(email,loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return true;
            }catch{
                return false;
            }
        }
    }
}
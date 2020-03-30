import { GenerateSecret } from "../../../util";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        RequestSecret: async(_,args) =>{
            const { email } = args;
            const loginSecret =  GenerateSecret();
            console.log(loginSecret); 
            try{
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return true;
            }catch{
                return false;
            }
        }
    }
}
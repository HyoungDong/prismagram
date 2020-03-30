import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        CreateAccount: async(_, args) =>{
            const { username, email, firstName ="", lastName ="", bio=""} = args;
            const user = await prisma.createUser({username, email, firstName, lastName, bio});
            return user;
        }
    }
}

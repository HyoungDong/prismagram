import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client"

export default {
    Mutation:{
        ToggleLike: async(_,args,{ request }) =>{
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            }
            try{
                const existingLike = await prisma.$exists.like(filterOptions);
                console.log(existingLike);
                if(existingLike){
                    await prisma.deleteManyLikes({
                        AND: [
                            {
                                user: {
                                    id: user.id
                                }
                            },
                            {
                                post: {
                                    id: postId
                                }
                            }
                        ]
                    })
                }else{
                    await prisma.createLike({
                        user:{
                            connect: {
                                id: user.id
                            }
                        },
                        post:{
                            connect: {
                                id: postId
                            }
                        }
                    });
                    console.log("거짓후");
                }
                return true;
            }catch(e){
                console.log(e);
                return false;
            }
        }
    }
}
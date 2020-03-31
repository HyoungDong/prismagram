import dotenv from "dotenv";
import path from "path";
import { GraphQLServer } from "graphql-yoga"; 
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./util";
import passport from "passport";
import "./passport";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({schema});
dotenv.config({path:path.join(__dirname,".env")});
server.express.use(logger("dev"));
server.express.use(passport.authenticate("jwt"));

server.start({port: PORT}, () => console.log(`Server is running on http://localhost:${PORT}`));
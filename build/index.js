"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs_1 = __importDefault(require("fs"));
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const resolvers_1 = require("./resolvers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_jwt_1 = require("express-jwt");
const client_1 = require("./prisma/client");
const bcrypt = require('bcrypt');
const jwtSecret = process.env.JWT_SECRET || "17NfUBizz9tBwt1cCWzNqthWQanwpETJ";
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(), body_parser_1.default.json(), (0, express_jwt_1.expressjwt)({
        algorithms: ['HS256'],
        secret: jwtSecret,
        credentialsRequired: false
    }));
    const httpServer = (0, http_1.createServer)(app);
    const typeDefs = (0, apollo_server_express_1.gql)(fs_1.default.readFileSync(`${__dirname}/schema.graphql`, { encoding: 'utf8' }));
    const context = ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        // if (req.auth) {
        //   const user = await prisma.user.findUnique({
        //     where: {
        //       id: req.auth.sub
        //     }
        //   });
        //   return { user }
        // }
        // return {};
        return { auth: req.auth };
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers: resolvers_1.resolvers,
        context
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    });
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, password } = req.body;
            // const saltRounds = process.env.SOLTROUNDS;
            // const hash = bcrypt.hashSync(password, saltRounds);
            const user = yield client_1.prisma.user.findUnique({
                where: {
                    name: name
                }
            });
            // If there is not a user
            if (!user) {
                throw new Error('Your name or password is wrong.');
            }
            ;
            const passwordCheck = bcrypt.compareSync(password, user.password);
            // If password is wrong
            if (!passwordCheck) {
                throw new Error('Your name or password is wrong.');
            }
            const token = jsonwebtoken_1.default.sign({ sub: user.id }, jwtSecret);
            res.status(200).json({ token });
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message;
            }
            else {
                message = String(error);
            }
            res.status(401).json({ message: message });
        }
    }));
    httpServer.listen({ port: process.env.PORT || 4000 }, () => console.log(`Server listening on localhost:${process.env.PORT || 4000}${apolloServer.graphqlPath}`));
});
startServer();

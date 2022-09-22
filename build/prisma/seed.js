"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const client_1 = require("./client");
const config_1 = require("../config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield createUsers();
    const promises = users.map((user) => {
        return createTodos(user);
    });
    const todos = yield Promise.all(promises);
    console.log({
        users,
        todos,
    });
});
const createUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [...Array(3)].map((_, i) => {
        const userId = uuidv4();
        const hash = bcrypt.hashSync(`password${i + 1}`, config_1.saltRounds);
        return client_1.prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: {
                id: userId,
                name: `user_${i + 1}`,
                password: hash
            },
        });
    });
    return yield Promise.all(promises);
});
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const createTodos = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const categoriesArr = ["hobby", "work", "study", "other"];
    const promises = [...Array(4)].map((_, i) => {
        const number = i + 1;
        return client_1.prisma.todo.create({
            data: {
                title: `${user.name}_todo_${number}_title`,
                description: `${user.name}_todo_${number}_description`,
                category: categoriesArr[randomIntFromInterval(0, 3)],
                status: 'pending',
                priority: randomIntFromInterval(1, 3),
                userId: user.id,
            },
        });
    });
    return yield Promise.all(promises);
});
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.prisma.$disconnect();
}));

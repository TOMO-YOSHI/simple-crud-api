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
exports.createTodo = void 0;
const client_1 = require("../../prisma/client");
const createTodo = (_root, { input }, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth) {
        throw new Error('Unauthorized');
    }
    const todo = yield client_1.prisma.todo.create({
        data: Object.assign(Object.assign({}, input), { userId: auth.sub })
    });
    return todo;
});
exports.createTodo = createTodo;

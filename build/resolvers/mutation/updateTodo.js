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
exports.updateTodo = void 0;
const client_1 = require("../../prisma/client");
const updateTodo = (_root, { id, input }, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth) {
        throw new Error('Unauthorized');
    }
    const todo = yield client_1.prisma.todo.findUnique({
        where: {
            id: id
        }
    });
    // If the todo is not owned by the user who sent this request
    if (todo.userId !== auth.sub) {
        throw new Error('You do not have right permission.');
    }
    const updatedTodo = yield client_1.prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: input.title,
            description: input.description,
            category: input.category,
            status: input.status,
            priority: input.priority,
        },
    });
    return updatedTodo;
});
exports.updateTodo = updateTodo;

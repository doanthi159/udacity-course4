import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
// import { TodoItem } from '../models/TodoItem'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic
const todoAccess = new TodosAccess();
const attachmentAccess = new AttachmentUtils();
// Get todo
export async function getTodosForUser(userId: string) {
    //Get todos created by user id
    return todoAccess.getTodosForUser(userId);
}

// Create todo
export async function createTodosForUser(item: object) {
    return todoAccess.createTodosForUser(item);
}

// delete todo
export async function deleteTodosForUser(todoId: String, userId: String) {
    return todoAccess.deleteTodo(todoId, userId);
}

// update todo
export async function updateTodosForUser(todoId: String, userId: String, data: UpdateTodoRequest) {
    return todoAccess.updateTodo(todoId, userId, data);
}


// create attachment
export async function createAttachmentPresignedUrl(todoId: String, userId: String, attachmentUrl: String) {
    return attachmentAccess.updateTodoAttachmentUrl(todoId, userId, attachmentUrl);
}

// get url
export async function getUploadUrl(imageId: String) {
    return attachmentAccess.getUploadUrl(imageId);
}

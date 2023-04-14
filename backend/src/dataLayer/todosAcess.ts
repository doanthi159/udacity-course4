import * as AWS from 'aws-sdk'
// import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

// const logger = createLogger('TodosAccess')

// TODOdone: Implement the dataLayer logic
export class TodosAccess {

    constructor(
        private readonly docClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE
    ) {
    }

    async getTodosForUser(userId: string): Promise<TodoItem[]> {
        const result = await this.docClient.query({
            TableName: this.todosTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()
        return result.Items as TodoItem[]
    }

    // create todo for user
    async createTodosForUser(Item: object): Promise<TodoItem> {
        await this.docClient.put({
        TableName: this.todosTable,
        Item: Item
        }).promise()
    
        return Item as TodoItem
    }

    async updateTodo(todoId: String, userId: String, data: TodoUpdate): Promise<TodoUpdate> {

        await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: "set #name = :name, dueDate=:dueDate, done=:done",
            ExpressionAttributeValues: {
                ":name": data.name,
                ":dueDate": data.dueDate,
                ":done": data.done
            },
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()

        return data;
    }

    async deleteImageTodo(todoId: String, userId: String) {

        return await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: "set attachmentUrl=:attachmentUrl",
            ExpressionAttributeValues : {
                ":attachmentUrl": '',
            },
            ReturnValues:"UPDATED_NEW"
        }).promise()
    }

    async deleteTodo(todoId: String, userId: String) {
        return await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
                todoId: todoId,
                userId: userId
            }
        }).promise()
    }
}
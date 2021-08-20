import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
    constructor(private readonly messagesRepository: MessagesRepository) {}

    async findOne(id: string): Promise<any> {
        return this.messagesRepository.findOne(id);
    }

    async findAll(): Promise<any> {
        return this.messagesRepository.findAll();
    }

    async create(message: string): Promise<void> {
        return this.messagesRepository.create(message);
    }
}
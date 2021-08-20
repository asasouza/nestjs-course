import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";

@Injectable()
export class MessagesRepository {
    async findOne(id: string): Promise<any> {
        const content = await fs.readFile('data/messages.json', 'utf8');
        const messages = JSON.parse(content);
        return messages[id];
    }

    async findAll(): Promise<any> {
        const content = await fs.readFile('data/messages.json', 'utf8');
        const messages = JSON.parse(content);

        return messages;
    }

    async create(message: string): Promise<void> {
        const content = await fs.readFile('data/messages.json', 'utf8');
        const messages = JSON.parse(content);

        const id = Math.floor(Math.random() * 999);

        messages[id] = { id, content: message };

        await fs.writeFile('data/messages.json', JSON.stringify(messages));
    }
}
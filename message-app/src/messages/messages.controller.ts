import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDTO } from './dto/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get()
    async listMessages(): Promise<void> {
        return this.messagesService.findAll();
    }

    @Post()
    async createMessage(@Body() body: CreateMessageDTO): Promise<any> {
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string): Promise<any> {
        const message = await this.messagesService.findOne(id);

        if (!message) {
            throw new NotFoundException('message not found');
        }
        return message;
    }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDTO } from './dto/create-message-dto';

@Controller('messages')
export class MessagesController {
    @Get()
    async listMessages(): Promise<void> {}

    @Post()
    async createMessage(@Body() body: CreateMessageDTO): Promise<any> {
        console.log(body);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string): Promise<any> {
        console.log(id);
    }
}

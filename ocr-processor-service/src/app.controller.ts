import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('url_pushed')
  async handleMessagePrinted(data: Record<string, string>) {
    const fileUrl = data.fileUrl;

    const filePath = await this.appService.downloadImage(fileUrl);

    console.log(await this.appService.recognize(filePath, 'eng', null));

    await this.appService.deleteFile(filePath);
  }
}

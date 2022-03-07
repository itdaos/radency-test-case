import { Controller, Post, Body, Res, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ProcessOcrDto } from './dto/process-ocr-dto';

@Controller("ocr")
export class AppController {
  constructor(
    private readonly service : AppService
  ) {}

  async onApplicationBootstrap() {
    // await this.client.connect();
  }

  @Post("process")
  process(@Body() processOcrDto: ProcessOcrDto): string {

    const fileUrl = processOcrDto.fileUrl;
    // console.log(fileUrl);

    const hasSupportedExtension = fileUrl.match(/\.(jpeg|jpg|png)$/)
    if ( !hasSupportedExtension ) {
      throw new HttpException("The url provided must have one of these types: jpeg/jpg/png", HttpStatus.BAD_REQUEST);
    }

    // publish the url to the queue
    this.service.publishUrl(fileUrl).subscribe({
      next: (data) => console.log("data on transfer: ", data),
      error: (err) => console.error("Error occured: ", err),
      complete: () => console.log("The OCR was delivered")
    });

    return "Message was sent to the queue";
  }
}

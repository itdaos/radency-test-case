import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UrlMessage } from './messages/url.message';

@Injectable()
export class AppService {
  constructor(@Inject('OCR_SERVICE') private readonly client: ClientProxy) {}

  publishUrl(fileUrl: string): Observable<UrlMessage> {
    return this.client.send<UrlMessage>('url_pushed', new UrlMessage(fileUrl));
  }
}

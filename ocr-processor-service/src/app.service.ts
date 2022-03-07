import { Injectable } from '@nestjs/common';

import { createWorker, RecognizeResult } from 'tesseract.js'; // npm install --save tesseract.js
import * as fs from 'fs';
import * as stream from 'stream';
import * as path from 'path';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { promisify } from 'util';

@Injectable()
export class AppService {
  public async downloadImage(url: string): Promise<string> {
    const id = randomUUID();
    const finishedDownload = promisify(stream.finished);
    const filePath = path.resolve(__dirname, `${id}.jpg`);
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    response.data.pipe(writer);
    return finishedDownload(writer).then(() => filePath);
  }

  public async deleteFile(filePath): Promise<void> {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  public async recognize(
    imgPath: string,
    lang: string,
    locatedRectangle: any,
  ): Promise<string> {
    let recognizedText = 'undefined';

    // OCR recognition
    const ocrWorker = createWorker({});
    await ocrWorker.load();
    await ocrWorker.loadLanguage(lang);
    await ocrWorker.initialize(lang);

    let recognizeResult: RecognizeResult;
    if (locatedRectangle !== null) {
      recognizeResult = await ocrWorker.recognize(imgPath, {
        rectangle: locatedRectangle,
      });
    } else {
      recognizeResult = await ocrWorker.recognize(imgPath);
    }
    await ocrWorker.terminate();

    recognizedText = recognizeResult.data.text;
    return recognizedText;
  }
}

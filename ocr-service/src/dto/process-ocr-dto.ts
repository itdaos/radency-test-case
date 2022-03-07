import {IsUrl} from 'class-validator';

export class ProcessOcrDto {
    @IsUrl()
    fileUrl: string;
}
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private fileSystemRaumRepository: FileSystemRaumRepository
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/hello')
  getHelloWorld() {
    return this.appService.getHelloWorld();
  }
}

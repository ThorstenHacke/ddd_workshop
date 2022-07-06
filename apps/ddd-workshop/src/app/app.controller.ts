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
import { erstelleRaum, ErstelleRaumErgebnis } from './application/raum.use-cases';
import { Name } from './domain/name.value-object';
import { Raum } from './domain/raum.entity';
import { RaumNummer } from './domain/raumnummer.value-object';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';
import { RoomDto } from './infrastructure/room.dto';

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

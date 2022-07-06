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

  @Get('/room/:id')
  getRaum(@Param() params: { id: string }) {

    let roomNumber: RaumNummer;

    try {
      roomNumber = new RaumNummer(params.id);
    } catch (error) {
      throw new HttpException('Not valid room number', HttpStatus.BAD_REQUEST)
    }

    const existingRoom = this.fileSystemRaumRepository.laden(roomNumber);

    if (!existingRoom) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    const room = RoomDto.fromRaum(existingRoom);

    return room;
  }

  @Post('/room')
  postRaum(@Body() room: RoomDto) {
    const raumNummer = new RaumNummer(room.number);
    const name = new Name(room.name);

    const response: ErstelleRaumErgebnis = erstelleRaum(raumNummer, name, this.fileSystemRaumRepository);

    if (response === ErstelleRaumErgebnis.EXISTIERT_BEREITS) {
      throw new HttpException('Room already exists', HttpStatus.BAD_REQUEST);
    }
  }
}

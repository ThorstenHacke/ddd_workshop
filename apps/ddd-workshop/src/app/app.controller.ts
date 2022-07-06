import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { erstelleRaum, ladeRaum } from './application/raum.use-cases';
import { Raum } from './domain/raum.entity';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';
import { FileSystemRaumService } from './infrastructure/file-system-raum.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private fileSystemRaumRepository: FileSystemRaumRepository,
    private fileSystemRaumService: FileSystemRaumService
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
  getRaum(@Param() id: string) {
    const raum = ladeRaum(id, this.fileSystemRaumRepository);
    return raum;
  }

  @Post('/room')
  postRaum(@Body() raum: Raum) {
    erstelleRaum(raum.raumNummer.raumNummer, raum.name.name, this.fileSystemRaumRepository, this.fileSystemRaumService);
  }
}

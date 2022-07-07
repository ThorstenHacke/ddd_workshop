import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  erstelleRaum,
  ErstelleRaumErgebnis,
} from '../application/erstelle-raum.use-case';
import { holeRaumMitPersonen } from '../application/hole-raum-mit-personen.use-case';
import {
  personHinzufuegen,
  PersonHinzufuegenErgebnis,
} from '../application/person-hinzufuegen.use-case';
import {
  LDAPBenutzername,
  Nachname,
  Namenszusatz,
  Person,
  PersonID,
  Titel,
  Vorname,
} from '../domain/person/person.entity';
import { Name, RaumNummer } from '../domain/raum/raum.entity';
import { FileSystemPersonRepository } from './file-system-person.repository';
import { FileSystemRaumRepository } from './file-system-raum.repository';
import { AddPersonDto, PersonDto } from './person.dto';
import { RoomDto } from './room.dto';

@Controller()
export class RoomController {
  constructor(private fileSystemRaumRepository: FileSystemRaumRepository, private fileSystemPersonRepository : FileSystemPersonRepository) {}

  @Get('/room/:id')
  getRaum(@Param() params: { id: string }) {
    let roomNumber: RaumNummer;

    try {
      roomNumber = new RaumNummer(params.id);
    } catch (error) {
      throw new HttpException('Not valid room number', HttpStatus.BAD_REQUEST);
    }
    const raumMitPersonen = holeRaumMitPersonen(this.fileSystemRaumRepository, this.fileSystemPersonRepository, roomNumber);

    if (!raumMitPersonen) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    return raumMitPersonen;
  }

  @Post('/room')
  postRaum(@Body() room: RoomDto) {
    const raumNummer = new RaumNummer(room.number);
    const name = new Name(room.name);

    const response: ErstelleRaumErgebnis = erstelleRaum(
      raumNummer,
      name,
      this.fileSystemRaumRepository
    );

    if (response === ErstelleRaumErgebnis.EXISTIERT_BEREITS) {
      throw new HttpException('Room already exists', HttpStatus.BAD_REQUEST);
    }
  }
  @Put('/room/:id/person')
  putPerson(@Param() params: { id: string }, @Body() person: AddPersonDto) {
    const raumNummer = new RaumNummer(params.id);
    const ergebnis = personHinzufuegen(
      raumNummer,
      PersonID.from(person.id),
      this.fileSystemRaumRepository
    );
    switch (ergebnis) {
      case PersonHinzufuegenErgebnis.RAUM_NICHT_VORHANDEN:
        throw new HttpException('Raum nicht gefunden', HttpStatus.NOT_FOUND);
      case PersonHinzufuegenErgebnis.BEREITS_IN_ANDEREM_RAUM:
        throw new HttpException(
          'Person bereits in anderem Raum',
          HttpStatus.CONFLICT
        );
    }
  }
}

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
  personHinzufuegen,
} from '../application/raum.use-cases';
import { Name } from '../domain/name.value-object';
import { LDAPBenutzername, Nachname, Namenszusatz, Person, Titel, Vorname } from '../domain/person.entity';
import { RaumNummer } from '../domain/raumnummer.value-object';
import { FileSystemRaumRepository } from './file-system-raum.repository';
import { RoomDto } from './room.dto';

@Controller()
export class RoomController {
  constructor(private fileSystemRaumRepository: FileSystemRaumRepository) {}

  @Get('/room/:id')
  getRaum(@Param() params: { id: string }) {
    let roomNumber: RaumNummer;

    try {
      roomNumber = new RaumNummer(params.id);
    } catch (error) {
      throw new HttpException('Not valid room number', HttpStatus.BAD_REQUEST);
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
  putPerson(@Param() params: { id: string }, @Body() person : any) {
    console.log("🚀 ~ file: room.controller.ts ~ line 63 ~ RoomController ~ putPerson ~ person", person)
    console.log("🚀 ~ file: room.controller.ts ~ line 63 ~ RoomController ~ putPerson ~ id", params.id)
    const raumNummer = new RaumNummer(params.id);
    const vorname = new Vorname(person.firstname);
    const nachname = new Nachname(person.lastname);
    const ldapBenutzername = new LDAPBenutzername(person.ldapUser);
    let titel
    if(person.titel){
      titel = new Titel(person.titel);
    }
    let namenszusatz;
    if(person.extension){
      namenszusatz = new Namenszusatz(person.extension);
    }
    const personEntity = new Person(vorname, nachname, ldapBenutzername, titel, namenszusatz);
    personHinzufuegen(raumNummer, personEntity, this.fileSystemRaumRepository);
  }
}

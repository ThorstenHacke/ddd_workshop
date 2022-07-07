import {
  Controller,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { erstellePerson, ErstellePersonErgebnis } from '../../application/erstelle-person.use-case';
import {
  personHinzufuegen,
  PersonHinzufuegenErgebnis,
} from '../../application/person-hinzufuegen.use-case';
import {
  Vorname,
  Nachname,
  LDAPBenutzername,
  Titel,
  Namenszusatz,
  Person,
} from '../../domain/person/person.entity';
import { FileSystemPersonRepository } from '../file-system-person.repository';
import {  PersonDto } from '../person.dto';

@Controller()
export class PersonController {
  constructor(private fileSystemPersonRepository: FileSystemPersonRepository) {}

  @Post('/person')
  putPerson(@Param() params: { id: string }, @Body() person: PersonDto) {
    const vorname = new Vorname(person.firstname);
    const nachname = new Nachname(person.lastname);
    const ldapBenutzername = new LDAPBenutzername(person.ldapUser);
    let titel: Titel;
    let namenszusatz: Namenszusatz;
    try {
      titel = Titel.with(person.title);
      namenszusatz = Namenszusatz.with(person.extension);
    } catch (error) {
      throw new HttpException(
        `Validierung Fehlgeschloagen. ${error}`,
        HttpStatus.BAD_REQUEST
      );
    }
    const ergebnis = erstellePerson(
      this.fileSystemPersonRepository,
      vorname,
      nachname,
      ldapBenutzername,
      titel,
      namenszusatz
    );
    switch (ergebnis) {
      case ErstellePersonErgebnis.EXISTIERT_BEREITS:
        throw new HttpException(
          'Person existiert bereits',
          HttpStatus.CONFLICT
        );
    }
  }
}

import { Raum } from '../domain/raum.entity';
import { RaumRepository } from '../domain/raum.repository';
import { RaumNummer } from '../domain/raumnummer.value-object';

import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Person } from '../domain/person.entity';

@Injectable()
export class FileSystemRaumRepository implements RaumRepository {
  istPersonSchonEinemRaumZugeordnet(person: Person): boolean {
    const files =  fs.readdirSync("data/");
    console.log("🚀 ~ file: file-system-raum.repository.ts ~ line 13 ~ FileSystemRaumRepository ~ istPersonSchonEinemRaumZugeordnet ~ files", files)
    return files.some((filename) => {
      console.log("🚀 ~ file: file-system-raum.repository.ts ~ line 16 ~ FileSystemRaumRepository ~ returnfiles.some ~ filename", filename)
      if(!filename.endsWith("json")){
        return false;
      }
      const fileContent = fs.readFileSync(`data/${filename}`);
      console.log("🚀 ~ file: file-system-raum.repository.ts ~ line 20 ~ FileSystemRaumRepository ~ returnfiles.some ~ fileContent", fileContent)
      const raum : Raum= JSON.parse(fileContent.toString());
      console.log("🚀 ~ file: file-system-raum.repository.ts ~ line 22 ~ FileSystemRaumRepository ~ returnfiles.some ~ raum", raum)
      if(raum.personen.some(exisingPerson => exisingPerson.ldapBenutzername.ldapBenutzername === person.ldapBenutzername.ldapBenutzername)){
        return true;
      }
      return false;
    });
  }
  laden(raumNummer: RaumNummer): Raum | null {
    try {
      const file = fs.readFileSync(`data/${raumNummer.raumNummer}.json`);
      const storedRoom = JSON.parse(file.toString());
      const personen = storedRoom.personen.map((person : Person) => new Person(person.vorname, person.nachname, person.ldapBenutzername, person.titel, person.namenszusatz));
      return new Raum(storedRoom.raumNummer, storedRoom.name, personen);
    } catch (error) {
      return null;
    }
  }
  speichern(raum: Raum): void {
    try {
      fs.writeFileSync(
        `data/${raum.raumNummer.raumNummer}.json`,
        JSON.stringify(raum)
      );
    } catch (error) {
      throw Error(`Could not save room: ${error}`);
    }
  }

  existiert(raumNummer: RaumNummer): boolean {
    const raum = this.laden(raumNummer);
    return !!raum;
  }
}

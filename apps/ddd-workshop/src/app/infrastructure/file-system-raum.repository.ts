import { Raum, RaumNummer } from '../domain/raum/raum.entity';
import { RaumRepository } from '../domain/raum/raum.repository';

import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Person } from '../domain/person/person.entity';





@Injectable()
export class FileSystemRaumRepository implements RaumRepository {

  laden(raumNummer: RaumNummer): Raum | null {
    try {
      const file = fs.readFileSync(`data/${raumNummer.raumNummer}.json`);
      const storedRoom :Raum = JSON.parse(file.toString());
      return new Raum(storedRoom.raumNummer, storedRoom.name, storedRoom.personen);
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

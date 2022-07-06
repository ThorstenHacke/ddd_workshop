import { Raum } from '../domain/raum.entity';
import { RaumRepository } from '../domain/raum.repository';
import { RaumNummer } from '../domain/raumnummer.value-object';

import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileSystemRaumRepository implements RaumRepository {
  laden(raumNummer: RaumNummer): Raum | null {
    try {
      const file = fs.readFileSync(`data/${raumNummer.raumNummer}.json`);
      return JSON.parse(file.toString());
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

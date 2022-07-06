import { Raum } from '../domain/raum.entity';
import { RaumRepository } from '../domain/raum.repository';
import { RaumNummer } from '../domain/raumnummer.value-object';

import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileSystemRaumRepository implements RaumRepository {
  get(raumNummer: RaumNummer): Raum {
    const file = fs.readFileSync(`${raumNummer.raumNummer}.json`);

    return JSON.parse(file.toString());
  }
  save(raum: Raum): void {
    fs.writeFileSync(
      `${raum.raumNummer.raumNummer}.json`,
      JSON.stringify(raum)
    );
  }
}

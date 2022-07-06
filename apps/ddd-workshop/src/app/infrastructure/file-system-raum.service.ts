import { RaumService } from '../domain/raum.service';
import { RaumNummer } from '../domain/raumnummer.value-object';
import { FileSystemRaumRepository } from './file-system-raum.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FileSystemRaumService implements RaumService {
  raumNummerExistiert(raumNummer: RaumNummer) {
    const raum = new FileSystemRaumRepository().get(raumNummer);

    return !!raum;
  }
}

import { Name } from './name.value-object';
import { RaumService } from './raum.service';
import { RaumNummer } from './raumnummer.value-object';

export class Raum {
  public readonly raumNummer: RaumNummer;
  public readonly name: Name;

  constructor(raumNummer: RaumNummer, name: Name, raumService: RaumService) {
    if (raumService.raumNummerExistiert(raumNummer)) {
      throw new Error('Nummer existiert schon');
    }

    this.name = name;
    this.raumNummer = raumNummer;
  }
}

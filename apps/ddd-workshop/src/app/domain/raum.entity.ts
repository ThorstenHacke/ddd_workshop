import { Name } from './name.value-object';
import { RaumNummer } from './raumnummer.value-object';

export class Raum {
  public readonly raumNummer: RaumNummer;
  public readonly name: Name;

  constructor(raumNummer: RaumNummer, name: Name) {
    this.name = name;
    this.raumNummer = raumNummer;
  }

}

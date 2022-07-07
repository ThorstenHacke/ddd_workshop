import { Name } from './name.value-object';
import { Person } from './person.entity';
import { RaumNummer } from './raumnummer.value-object';

export class Raum {
  public readonly raumNummer: RaumNummer;
  public readonly name: Name;
  public readonly personen: Person[];

  constructor(raumNummer: RaumNummer, name: Name, personen?: Person[]) {
    this.name = name;
    this.raumNummer = raumNummer;
    this.personen = personen ?? [];
  }
  public personHinzufuegen(person: Person) {
    this.personen.push(person);
  }

  public holePersonen() : string[]{
    return this.personen.map(person => person.kurzschreibweise())
  }
}

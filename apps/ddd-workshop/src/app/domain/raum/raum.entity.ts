import { PersonID } from "../person/person.entity";

export class Raum {
  public readonly raumNummer: RaumNummer;
  public readonly name: Name;
  public readonly personen: PersonID[];

  constructor(raumNummer: RaumNummer, name: Name, personen?: PersonID[]) {
    this.name = name;
    this.raumNummer = raumNummer;
    this.personen = personen ?? [];
  }
  public personHinzufuegen(personId: PersonID) {
    if(this.personen.some(id => id.value === personId.value)){
      throw new Error("Person bereits im Raum vorhanden");
    }
    this.personen.push(personId);
  }


}
export class RaumNummer {

  public readonly raumNummer: string;

  constructor(raumNummer: string) {

    if (!raumNummer.match(/\d\d\d\d/)) {
      throw new Error('Ungültige Länge');
    }

    this.raumNummer = raumNummer;

  }
}

export class Name {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}



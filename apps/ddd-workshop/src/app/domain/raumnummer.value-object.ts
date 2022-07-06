export class RaumNummer {

  public readonly raumNummer: string;

  constructor(raumNummer: string) {

    if (!raumNummer.match(/\d\d\d\d/)) {
      throw new Error('Ungültige Länge');
    }

    this.raumNummer = raumNummer;

  }
}

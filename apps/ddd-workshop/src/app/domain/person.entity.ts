export class Person {
  public vorname: Vorname;
  public nachname: Nachname;
  public ldapBenutzername: LDAPBenutzername;
  public titel?: Titel;
  public namenszusatz?: Namenszusatz;
  constructor(
    vorname: Vorname,
    nachname: Nachname,
    ldapBenutzername: LDAPBenutzername,
    titel?: Titel,
    namenszusatz?: Namenszusatz
  ) {
    this.vorname = vorname;
    this.nachname = nachname;
    this.ldapBenutzername = ldapBenutzername;
    this.titel = titel;
    this.namenszusatz = namenszusatz;
  }
  public kurzschreibweise (){
    return `${this.titel?.titel??""} ${this.vorname.vorname} ${this.namenszusatz?.namenszusatz??""} ${this.nachname.nachname} (${this.ldapBenutzername.ldapBenutzername})`.replace("  ", " ").trim();
  }
}

export class Vorname {
  public readonly vorname: string;
  constructor(vorname: string) {
    this.vorname = vorname;
  }
}

export class Nachname {
  public readonly nachname: String;
  constructor(nachname: string) {
    this.nachname = nachname;
  }
}

export class LDAPBenutzername {
  public readonly ldapBenutzername: String;
  constructor(ldapBenutzername: string) {
    this.ldapBenutzername = ldapBenutzername;
  }
}
export class Titel {
  public readonly titel: String;
  constructor(titel: string) {
    if (titel !== 'Dr.') {
      throw new Error('Nicht valider Titel');
    }
    this.titel = titel;
  }
}
export class Namenszusatz {
  private readonly ZUSAETZE = ['von', 'van', 'de'];
  public readonly namenszusatz: string;
  constructor(namenszusatz: string) {
    if (!this.ZUSAETZE.includes(namenszusatz)) {
      throw new Error('Invalider Namenszusatz');
    }
    this.namenszusatz = namenszusatz;
  }
}

import { LDAPBenutzername, Nachname, Namenszusatz, Person, Titel, Vorname } from "../domain/person/person.entity";
import { PersonRepository } from "../domain/person/person.repository";

export function erstellePerson(
  personenRepository: PersonRepository,
  vorname: Vorname,
  nachname: Nachname,
  ldapBenutzername: LDAPBenutzername,
  titel?: Titel,
  namenszusatz?: Namenszusatz,
  ): ErstellePersonErgebnis {
  if (personenRepository.existiert(ldapBenutzername)) {
    return ErstellePersonErgebnis.EXISTIERT_BEREITS;
  }
  const person = new Person(vorname, nachname, ldapBenutzername, titel, namenszusatz);

  personenRepository.speichern(person);
  return ErstellePersonErgebnis.OK;
}

export enum ErstellePersonErgebnis {
  OK = 1,
  EXISTIERT_BEREITS = 2,
}


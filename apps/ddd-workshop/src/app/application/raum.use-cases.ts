import { Name } from '../domain/name.value-object';
import { Person } from '../domain/person.entity';
import { Raum } from '../domain/raum.entity';
import { RaumRepository } from '../domain/raum.repository';
import { RaumNummer } from '../domain/raumnummer.value-object';

export enum ErstelleRaumErgebnis {
  OK = 1,
  EXISTIERT_BEREITS = 2,
}

export enum PersonHinzufuegenErgebnis {
  OK = 1,
  BEREITS_IN_ANDEREM_RAUM = 2,
  RAUM_NICHT_VORHANDEN = 3,
}

export function erstelleRaum(
  raumNummer: RaumNummer,
  name: Name,
  raumRepository: RaumRepository
): ErstelleRaumErgebnis {
  if (raumRepository.existiert(raumNummer)) {
    return ErstelleRaumErgebnis.EXISTIERT_BEREITS;
  }
  const raum = new Raum(raumNummer, name);

  raumRepository.speichern(raum);
  return ErstelleRaumErgebnis.OK;
}

export function personHinzufuegen(
  raumNummer: RaumNummer,
  person: Person,
  raumRepository: RaumRepository
): PersonHinzufuegenErgebnis {
  const raum = raumRepository.laden(raumNummer);
  if (!raum) {
    return PersonHinzufuegenErgebnis.RAUM_NICHT_VORHANDEN;
  }
  if (raumRepository.istPersonSchonEinemRaumZugeordnet(person)) {
    return PersonHinzufuegenErgebnis.BEREITS_IN_ANDEREM_RAUM;
  }
  raum.personHinzufuegen(person);
  raumRepository.speichern(raum);
  return PersonHinzufuegenErgebnis.OK;
}

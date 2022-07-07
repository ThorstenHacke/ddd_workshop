import { PersonID } from "../domain/person/person.entity";
import { RaumNummer } from "../domain/raum/raum.entity";
import { RaumRepository } from "../domain/raum/raum.repository";

export function personHinzufuegen(
  raumNummer: RaumNummer,
  personID: PersonID,
  raumRepository: RaumRepository
): PersonHinzufuegenErgebnis {
  const raum = raumRepository.laden(raumNummer);
  if (!raum) {
    return PersonHinzufuegenErgebnis.RAUM_NICHT_VORHANDEN;
  }
  raum.personHinzufuegen(personID);
  raumRepository.speichern(raum);
  return PersonHinzufuegenErgebnis.OK;
}

export enum PersonHinzufuegenErgebnis {
  OK = 1,
  BEREITS_IN_ANDEREM_RAUM = 2,
  RAUM_NICHT_VORHANDEN = 3,
}

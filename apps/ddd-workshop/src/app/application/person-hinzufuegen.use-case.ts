import { Person } from "../domain/person.entity";
import { RaumRepository } from "../domain/raum.repository";
import { RaumNummer } from "../domain/raumnummer.value-object";

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

export enum PersonHinzufuegenErgebnis {
  OK = 1,
  BEREITS_IN_ANDEREM_RAUM = 2,
  RAUM_NICHT_VORHANDEN = 3,
}

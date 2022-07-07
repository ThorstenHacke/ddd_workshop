import { PersonID } from '../domain/person/person.entity';
import { PersonRepository } from '../domain/person/person.repository';
import { RaumNummer } from '../domain/raum/raum.entity';
import { RaumRepository } from '../domain/raum/raum.repository';

export function holeRaumMitPersonen(
  raumRepository: RaumRepository,
  personenRepository: PersonRepository,
  raumNummer: RaumNummer
) {
  const raum = raumRepository.laden(raumNummer);
  const personen = raum.personen.map((personID : PersonID)=> {
    return personenRepository.finde(personID).kurzschreibweise();
  });
  return {...raum, personen};
}

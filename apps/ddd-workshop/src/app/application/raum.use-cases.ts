import { Name } from '../domain/name.value-object';
import { Raum } from '../domain/raum.entity';
import { RaumRepository } from '../domain/raum.repository';
import { RaumNummer } from '../domain/raumnummer.value-object';

export enum ErstelleRaumErgebnis {
  OK = 1,
  EXISTIERT_BEREITS = 2,
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

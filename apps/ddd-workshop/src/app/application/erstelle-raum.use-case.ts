import { Name, Raum, RaumNummer } from '../domain/raum/raum.entity';
import { RaumRepository } from '../domain/raum/raum.repository';

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

export enum ErstelleRaumErgebnis {
  OK = 1,
  EXISTIERT_BEREITS = 2,
}


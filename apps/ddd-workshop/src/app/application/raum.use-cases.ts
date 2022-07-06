import { Name } from '../domain/name.value-object';
import { Raum } from '../domain/raum.entity';
import { RaumRepository } from '../domain/raum.repository';
import { RaumService } from '../domain/raum.service';
import { RaumNummer } from '../domain/raumnummer.value-object';

export function erstelleRaum(
  raumNummerValue: string,
  nameValue: string,
  raumRepository: RaumRepository,
  raumService: RaumService
): void {

  const raumNummer = new RaumNummer(raumNummerValue);
  const name = new Name(nameValue);
  const raum = new Raum(raumNummer, name, raumService);

  raumRepository.save(raum);
}

export function ladeRaum(id: string, raumRepository: RaumRepository): Raum {

  const raum = raumRepository.get(new RaumNummer(id));

  if (!raum) {
    throw new Error('Raum nicht gefunden');
  }

  return raum;
}

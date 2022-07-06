import { Raum } from './raum.entity';
import { RaumNummer } from './raumnummer.value-object';

export interface RaumRepository {
  get(raumNummer: RaumNummer): Raum | null;
  save(raum: Raum): void;
}

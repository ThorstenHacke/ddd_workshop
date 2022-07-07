import { Raum, RaumNummer } from './raum.entity';

export interface RaumRepository {
  laden(raumNummer: RaumNummer): Raum | null;
  speichern(raum: Raum): void;
  existiert(raumNummer: RaumNummer): boolean;
}

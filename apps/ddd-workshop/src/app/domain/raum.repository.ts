import { Person } from './person.entity';
import { Raum } from './raum.entity';
import { RaumNummer } from './raumnummer.value-object';

export interface RaumRepository {
  laden(raumNummer: RaumNummer): Raum | null;
  speichern(raum: Raum): void;
  existiert(raumNummer: RaumNummer): boolean;
  istPersonSchonEinemRaumZugeordnet(person: Person):boolean;
}

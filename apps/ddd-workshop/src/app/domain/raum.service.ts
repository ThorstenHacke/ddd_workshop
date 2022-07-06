import { RaumNummer } from './raumnummer.value-object';

export interface RaumService {
  raumNummerExistiert(raumNummer: RaumNummer);
}

import { Raum } from '../domain/raum/raum.entity';

export class RoomDto {
  public number: string;
  public name: string;
  public personen : string[]

  // public static fromRaum(raum: Raum): RoomDto {
  //   return {
  //     name: raum.name.name,
  //     number: raum.raumNummer.raumNummer,
  //     // personen: raum.holePersonen(),
  //   };
  // }
}

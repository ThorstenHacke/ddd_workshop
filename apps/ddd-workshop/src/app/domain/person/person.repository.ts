import { LDAPBenutzername, Person, PersonID } from "./person.entity";

export interface PersonRepository{
  existiert(LDAPBenutzername: LDAPBenutzername);
  finde(id: PersonID) : Person;
  speichern(person: Person) : void;
}

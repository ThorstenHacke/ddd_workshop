import { Injectable } from "@nestjs/common";
import { PersonID, Person, LDAPBenutzername } from "../domain/person/person.entity";
import { PersonRepository } from "../domain/person/person.repository";
import * as fs from 'fs';

@Injectable()
export class FileSystemPersonRepository implements PersonRepository {
  existiert(LDAPBenutzername: LDAPBenutzername) {
    const files =  fs.readdirSync("data/person/");
    return files.some((filename) => {
      if(!filename.endsWith("json")){
        return false;
      }
      const fileContent = fs.readFileSync(`data/person/${filename}`);
      const person : Person= JSON.parse(fileContent.toString());
      if(person.ldapBenutzername.ldapBenutzername === LDAPBenutzername.ldapBenutzername){
        return true;
      }
      return false;
    });


  }
  finde(id: PersonID): Person {
    const file = fs.readFileSync(`data/person/${id.value}.json`);
    const storedPerson :Person = JSON.parse(file.toString());
    const person = new Person(storedPerson.vorname, storedPerson.nachname, storedPerson.ldapBenutzername, storedPerson.titel, storedPerson.namenszusatz);
    person.id = storedPerson.id;
    return person;
  }
  speichern(person: Person): void {
    try {
      fs.writeFileSync(
        `data/person/${person.id.value}.json`,
        JSON.stringify(person)
      );
    } catch (error) {
      throw Error(`Could not save room: ${error}`);
    }
  }
}

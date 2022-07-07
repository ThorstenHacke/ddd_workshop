import { LDAPBenutzername, Nachname, Namenszusatz, Person, Titel, Vorname } from "./person.entity";

test('kurzname enthält titel', () => {
  const person = new Person(new Vorname("Teo"), new Nachname("Test"), new LDAPBenutzername("ttest"), Titel.with("Dr."))
  expect(person.kurzschreibweise()).toBe("Dr. Teo Test (ttest)");
});

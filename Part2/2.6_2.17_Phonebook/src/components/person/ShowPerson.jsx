import { Person } from "./Person";

export const ShowPerson = ({ person, deleteContact }) => {
  if (person.length) {
    return (
      <>
        <h2>PhoneBook:</h2>
        <hr />
        {person.map((individual) => (
          <Person
            key={individual.id}
            person={individual}
            deleteContact={() => deleteContact(individual.id)}
          />
        ))}
      </>
    );
  }
  return (
    <>
      <h2>PhoneBook:</h2>
      <hr />
      <p>Add some contact...</p>
    </>
  );
};

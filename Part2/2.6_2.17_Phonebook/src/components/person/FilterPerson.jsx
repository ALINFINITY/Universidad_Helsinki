import { Person } from "./Person";

export const FilterPerson = ({
  onsubmitFormFilter,
  namefilter,
  onchangeNameFilter,
  filters,
  deleteContact,
}) => {
  return (
    <>
      <h2>Filter</h2>
      <hr />

      <form onSubmit={onsubmitFormFilter}>
        <label htmlFor="name">Filter by Chart or Name: </label>
        <input type="text" value={namefilter} onChange={onchangeNameFilter} />
        <button type="submit">Filter</button>
      </form>

      {filters.map((results) => (
        <Person
          key={results.id}
          person={results}
          deleteContact={() => deleteContact(results.id)}
        />
      ))}
    </>
  );
};

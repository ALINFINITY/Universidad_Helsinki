export const Person = ({ person,deleteContact }) => {
  return (
    <div className="my-card">
      <h4>{person.name}</h4>
      <p>Number: {person.number}</p>
      <div>
        <p>Actions:</p>
        <button onClick={deleteContact}>Delete</button>
      </div>
    </div>
  );
};

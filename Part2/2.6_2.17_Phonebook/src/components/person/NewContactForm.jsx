export const NewContactForm = ({onsubmitForm,name,onchangeName,number,onchangeNumber}) => {
  return (
    <>
      <h2>New Contact</h2>
      <hr />
      <form onSubmit={onsubmitForm}>
        <label htmlFor="name">Name: </label>
        <input type="text" value={name} onChange={onchangeName} />
        <label htmlFor="number">Number: </label>
        <input type="text" value={number} onChange={onchangeNumber} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

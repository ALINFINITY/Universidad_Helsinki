export const Parts = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.id}>
          Part: {part.name} --- Activities: {part.exercises}{" "}
        </p>
      ))}
    </>
  );
};

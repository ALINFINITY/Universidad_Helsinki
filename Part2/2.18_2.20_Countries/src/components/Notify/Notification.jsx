export const Notification = ({ message, className }) => {
  if (message) {
    return (
      <div className={className}>
        <h3>{message}</h3>
      </div>
    );
  } else {
    return <></>;
  }
};

export const Notification = ({className, message }) => {
  if (message) {
    return (
      <div className={className}>
        <h3>{message}</h3>
      </div>
    );
  } else {
    return null;
  }
};

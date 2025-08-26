import '../App.css';

//For changes made to the type here, also update app.tsx
type userEntry = {
  id: number;
  name: string;
};

export const UserEntry = (user: userEntry) => {
  return (
    <div className="userRow" key={user.id}>
      {Object.entries(user).map(([key, value]) => (
        <div className="userCell" key={key}>
          {value}
        </div>
      ))}
    </div>
  );
};

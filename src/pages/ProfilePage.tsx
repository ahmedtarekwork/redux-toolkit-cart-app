import { useSelector } from "react-redux";
import { RootStateType } from "../app/store";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state: RootStateType) => state.users.currentUser);

  if (!user) return <Navigate to="/" />;

  const {
    address: { city, street, number },
    email,
    name: { firstname, lastname },
    phone,
    username,
  } = user;

  return (
    <>
      <h2 className="title-with-line">
        {firstname} {lastname} profile's
      </h2>
      <ul className="profile-info-list">
        <li>
          username : <strong>{username}</strong>
        </li>

        <li className="flex">
          email :{" "}
          <strong>
            <a className="fit" href={`mailto:${email}`}>
              {email}
            </a>
          </strong>
        </li>

        <li className="flex">
          phone:{" "}
          <strong>
            <a className="fit" href={`tel:${phone}`}>
              {phone}
            </a>
          </strong>
        </li>
      </ul>

      <h3
        style={{
          margin: "20px 0 10px",
        }}
      >
        address info
      </h3>
      <address>
        {number}, {street}, {city}
      </address>
    </>
  );
};
export default ProfilePage;

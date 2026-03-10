import { Link } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import CooperationRiskForm from "./Form/CooperationRiskForm";

const languages = [
  {
    id: "fi" as const,
    name: {
      fi: "Suomi",
      en: "Finnish",
    },
  },
  {
    id: "en" as const,
    name: {
      fi: "Englanti",
      en: "English",
    },
  },
];

const FormPage = () => {
  const { user, clearUser } = useCurrentUser();
  const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");

  return (
    <>
      <div>
        {user && <p>Logged in as {user.username}</p>}
        {user && <button onClick={clearUser}>Logout</button>}
      </div>

      <div>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/user">User Page</Link>
      </div>

      <div>
        <h1>Form Page</h1>

        <select
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(e.target.value as "fi" | "en")
          }
        >
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {selectedLanguage === "fi"
                ? language.id
                : language.id}
            </option>
          ))}
        </select>

        {user ? (
          <CooperationRiskForm language={selectedLanguage} />
        ) : (
          <p>Log in to view the page</p>
        )}
      </div>
    </>
  );
};

export default FormPage;
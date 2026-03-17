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
      {user &&
        <div>
          {selectedLanguage === 'fi' ?
            <p>Kirjautuneena {user.username}</p>
            :
            <p>Logged in as {user.username}</p>
          }
          {selectedLanguage === 'fi' ?
            <button onClick={clearUser}>Kirjaudu ulos</button>
            :
            <button onClick={clearUser}>Logout</button>
          }
        </div>
      }

      <div>
        {selectedLanguage === 'fi' ?
          <Link to="/">Riskilomake</Link>
          :
          <Link to="/">Risk form</Link>
        }
        {" | "}
        {selectedLanguage === 'fi' ?
          <Link to="/user">Kirjaudu sisään</Link>
          :
          <Link to="/user">Login</Link>
        }
      </div>

      <div>
        {selectedLanguage === 'fi' ?
          <h1>Riskiarviolomake</h1>
          :
          <h1>Risk assessment form</h1>
        }

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
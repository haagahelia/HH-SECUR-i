import Navbar from "./Layout/Navbar";
import { useState } from "react";

const UserPage = () => {
	const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");

	return (
		<>
			<Navbar language={selectedLanguage} setLanguage={setSelectedLanguage} />
			<div>
				{selectedLanguage === 'fi' ?
					<h1>Käyttäjä</h1>
					:
					<h1>User</h1>
				}
			</div>
		</>
	)
}

export default UserPage;
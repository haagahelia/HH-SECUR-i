import { useState, createContext, useContext } from "react";

type FormAnswersContextValues = {
    selectedCountry: string
    setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
    selectedOrganization: string;
    setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>;
    projectName: string;
    setProjectName: React.Dispatch<React.SetStateAction<string>>;
    projectDescription: string;
    setProjectDescription: React.Dispatch<React.SetStateAction<string>>;
    duration: string;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
    hhRole: string;
    setHhRole: React.Dispatch<React.SetStateAction<string>>;
    consortium: string;
    setConsortium: React.Dispatch<React.SetStateAction<string>>;
    history: string;
    setHistory: React.Dispatch<React.SetStateAction<string>>;
    organizationType: string;
    setOrganizationType: React.Dispatch<React.SetStateAction<string>>;
    contractStatus: string;
    setContractStatus: React.Dispatch<React.SetStateAction<string>>;
    funding: string;
    setFunding: React.Dispatch<React.SetStateAction<string>>;
    liability: string;
    setLiability: React.Dispatch<React.SetStateAction<string>>;
    personalInformation: string;
    setPersonalInformation: React.Dispatch<React.SetStateAction<string>>;
    dualUse: string;
    setDualUse: React.Dispatch<React.SetStateAction<string>>;
    ethics: string;
    setEthics: React.Dispatch<React.SetStateAction<string>>;
    cooperationType: string[];
    setCooperationType: React.Dispatch<React.SetStateAction<string[]>>;
    clearAnswers: () => void;

}

const FormAnswersContext = createContext<FormAnswersContextValues | undefined>(undefined);

export const FormAnswersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [hhRole, setHhRole] = useState("");
    const [consortium, setConsortium] = useState("");
    const [history, setHistory] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [contractStatus, setContractStatus] = useState("");
    const [funding, setFunding] = useState("");
    const [liability, setLiability] = useState("");
    const [personalInformation, setPersonalInformation] = useState("");
    const [dualUse, setDualUse] = useState("");
    const [ethics, setEthics] = useState("");
    const [cooperationType, setCooperationType] = useState<string[]>([]);

    const clearAnswers = () => {
        setSelectedCountry("");
        setSelectedOrganization("");
        setProjectName("");
        setProjectDescription("");
        setDuration("");
        setHhRole("");
        setConsortium("");
        setHistory("");
        setOrganizationType("");
        setContractStatus("");
        setFunding("");
        setLiability("");
        setPersonalInformation("");
        setDualUse("");
        setEthics("");
        setCooperationType([]);
    }


    return (
        <FormAnswersContext.Provider value={{
            selectedCountry, setSelectedCountry, selectedOrganization, setSelectedOrganization, projectName, setProjectName,
            projectDescription, setProjectDescription, duration, setDuration, hhRole, setHhRole, consortium, setConsortium, history, setHistory, organizationType, setOrganizationType,
            contractStatus, setContractStatus, funding, setFunding, liability, setLiability, personalInformation, setPersonalInformation, dualUse, setDualUse, ethics, setEthics,
            cooperationType, setCooperationType, clearAnswers
        }}>
            {children}
        </FormAnswersContext.Provider>
    )
}

export const useFormAnswers = () => {
    const ctx = useContext(FormAnswersContext)
    if (!ctx) {
        throw new Error('useFormAnswers must be used within a FormAnswersProvider');
    }
    return ctx;
}
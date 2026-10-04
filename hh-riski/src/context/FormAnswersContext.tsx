import { useState, createContext, useContext } from "react";
import type { Organization, User, Country } from "../types";

type FormAnswersContextValues = {
    selectedLanguage: "fi" | "en";
    setSelectedLanguage: React.Dispatch<React.SetStateAction<"fi" | "en">>;
    selectedCountry: Country | null;
    setSelectedCountry: React.Dispatch<React.SetStateAction<Country | null>>;
    selectedOrganization: Organization | null;
    setSelectedOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
    organizationName: string;
    setOrganizationName: React.Dispatch<React.SetStateAction<string>>;
    selectedProjectOwner: User | null;
    setSelectedProjectOwner: React.Dispatch<React.SetStateAction<User | null>>;
    projectName: string;
    setProjectName: React.Dispatch<React.SetStateAction<string>>;
    projectDescription: string;
    setProjectDescription: React.Dispatch<React.SetStateAction<string>>;
    duration: string;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
    hhRole: string;
    setHhRole: React.Dispatch<React.SetStateAction<string>>;
    hhRoleOther: string;
    setHhRoleOther: React.Dispatch<React.SetStateAction<string>>;
    consortium: string;
    setConsortium: React.Dispatch<React.SetStateAction<string>>;
    history: string;
    setHistory: React.Dispatch<React.SetStateAction<string>>;
    organizationType: string;
    setOrganizationType: React.Dispatch<React.SetStateAction<string>>;
    organizationTypeOther: string;
    setOrganizationTypeOther: React.Dispatch<React.SetStateAction<string>>;
    contractStatus: string;
    setContractStatus: React.Dispatch<React.SetStateAction<string>>;
    funding: string;
    setFunding: React.Dispatch<React.SetStateAction<string>>;
    exchange: string;
    setExchange: React.Dispatch<React.SetStateAction<string>>;
    fundingSource: string;
    setFundingSource: React.Dispatch<React.SetStateAction<string>>;
    fundingHistory: string;
    setFundingHistory: React.Dispatch<React.SetStateAction<string>>;
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
    cooperationTypeOther: string;
    setCooperationTypeOther: React.Dispatch<React.SetStateAction<string>>;
    clearAnswers: () => void;

}

const FormAnswersContext = createContext<FormAnswersContextValues | undefined>(undefined);

export const FormAnswersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [organizationName, setOrganizationName] = useState("");
    const [selectedProjectOwner, setSelectedProjectOwner] = useState<User | null>(null);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [hhRole, setHhRole] = useState("");
    const [hhRoleOther, setHhRoleOther] = useState("");
    const [consortium, setConsortium] = useState("");
    const [history, setHistory] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [organizationTypeOther, setOrganizationTypeOther] = useState("");
    const [contractStatus, setContractStatus] = useState("");
    const [funding, setFunding] = useState("");
    const [exchange, setExchange] = useState("");
    const [fundingSource, setFundingSource] = useState("");
    const [fundingHistory, setFundingHistory] = useState("");
    const [liability, setLiability] = useState("");
    const [personalInformation, setPersonalInformation] = useState("");
    const [dualUse, setDualUse] = useState("");
    const [ethics, setEthics] = useState("");
    const [cooperationType, setCooperationType] = useState<string[]>([]);
    const [cooperationTypeOther, setCooperationTypeOther] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");

    const clearAnswers = () => {
        setSelectedCountry(null);
        setSelectedOrganization(null);
        setOrganizationName("");
        setSelectedProjectOwner(null);
        setProjectName("");
        setProjectDescription("");
        setDuration("");
        setHhRole("");
        setHhRoleOther("");
        setConsortium("");
        setHistory("");
        setOrganizationType("");
        setOrganizationTypeOther("");
        setContractStatus("");
        setFunding("");
        setExchange("");
        setFundingSource("");
        setFundingHistory("");
        setLiability("");
        setPersonalInformation("");
        setDualUse("");
        setEthics("");
        setCooperationType([]);
        setCooperationTypeOther("");
        window.scrollTo(0, 0);
    }

    return (
        <FormAnswersContext.Provider value={{
            selectedLanguage, setSelectedLanguage, selectedCountry, setSelectedCountry, selectedOrganization, setSelectedOrganization, organizationName, setOrganizationName, selectedProjectOwner, setSelectedProjectOwner, projectName, setProjectName,
            projectDescription, setProjectDescription, duration, setDuration, hhRole, setHhRole, hhRoleOther, setHhRoleOther, consortium, setConsortium, history, setHistory, organizationType, setOrganizationType, organizationTypeOther, setOrganizationTypeOther,
            contractStatus, setContractStatus, funding, setFunding, exchange, setExchange, fundingSource, setFundingSource, fundingHistory, setFundingHistory, liability, setLiability, personalInformation, setPersonalInformation, dualUse, setDualUse, ethics, setEthics,
            cooperationType, setCooperationType, cooperationTypeOther, setCooperationTypeOther, clearAnswers
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
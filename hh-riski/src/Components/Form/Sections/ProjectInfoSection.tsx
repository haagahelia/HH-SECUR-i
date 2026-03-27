/* import FormSection from "./FormSection";

type ProjectInfoSectionProps = {
    language: "fi" | "en";
    projectName: string;
    projectDescription: string;
    duration: string;
    onProjectNameChange: (value: string) => void;
    onProjectDescriptionChange: (value: string) => void;
    onDurationChange: (value: string) => void;
};

const durationOptions = [
    { value: "0-24", fi: "0–24 kk", en: "0–24 months" },
    { value: "24-60", fi: "24–60 kk", en: "24–60 months" },
    { value: "60+", fi: "yli 60 kk", en: "over 60 months" },
];


const ProjectInfoSection = ({
    language,
    projectName,
    projectDescription,
    duration,
    onProjectNameChange,
    onProjectDescriptionChange,
    onDurationChange
}: ProjectInfoSectionProps) => {
    return (
        <FormSection
            title={language === "fi" ? "Projektin tiedot" : "Project Information"}
            description={
                language === "fi"
                    ? "Täytä projektin perustiedot."
                    : "Fill in the basic project information."
            }
        >
            <div>
                <label>
                    {language === "fi" ? "Projektin nimi" : "Project name"}
                </label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => onProjectNameChange(e.target.value)}
                />
            </div>

            <div>
                <label>
                    {language === "fi" ? "Projektin kuvaus" : "Project description"}
                </label>
                <textarea
                    value={projectDescription}
                    onChange={(e) => onProjectDescriptionChange(e.target.value)}
                />
            </div>

            <div>
                <label>
                    {language === "fi" ? "Projektin kesto" : "Project duration"}
                </label>
                <select
                    value={duration}
                    onChange={(e) => onDurationChange(e.target.value)}
                >
                    <option value="">
                        {language === "fi" ? "Valitse kesto" : "Select duration"}
                    </option>

                    {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option[language]}
                        </option>
                    ))}
                </select>
            </div>
        </FormSection>
    );
};

export default ProjectInfoSection; */
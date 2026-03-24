import FormSection from "./FormSection";

type ProjectInfoSectionProps = {
    language: "fi" | "en";
    projectName: string;
    projectDescription: string;
    startDate: string;
    endDate: string;
    onProjectNameChange: (value: string) => void;
    onProjectDescriptionChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
};

const ProjectInfoSection = ({
    language,
    projectName,
    projectDescription,
    startDate,
    endDate,
    onProjectNameChange,
    onProjectDescriptionChange,
    onStartDateChange,
    onEndDateChange,
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
                    {language === "fi" ? "Aloituspäivä" : "Start date"}
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
            </div>

            <div>
                <label>
                    {language === "fi" ? "Päättymispäivä" : "End date"}
                </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />
            </div>
        </FormSection>
    );
};

export default ProjectInfoSection;
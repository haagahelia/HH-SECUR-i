type SingleSelectProps = {
    question: { fi: string; en: string } | undefined;
    placeholder: { fi: string; en: string } | undefined;
    answers: { id: string; name: { fi: string; en: string }; manuallyAdded?: boolean; }[] | undefined;
    language: "fi" | "en";
    value: string;
    onChange: (value: string) => void;
};

import { FormControl, InputLabel, MenuItem, Select, Chip } from "@mui/material";

const SingleSelect = ({
    question,
    placeholder,
    answers,
    language,
    value,
    onChange,
}: SingleSelectProps) => {
    const label = question?.[language];

    return (
        <FormControl fullWidth size="small">
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={answers?.some(answer => answer.id === value) ? value : ""}
                onChange={(event) => onChange(event.target.value)}
            >
                <MenuItem value="">{placeholder?.[language]}</MenuItem>

                {answers?.map((answer) => (
                    <MenuItem key={answer.id} value={answer.id}>
                        {answer.name[language]}
                        {answer.manuallyAdded && (
                            <Chip 
                            label={language === "fi" ? "Lisätty manuaalisesti" : "Manually added"}
                            size="small"
                            color="info"
                            sx={{ ml: 1}}
                            />
                        )}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
};

export default SingleSelect;

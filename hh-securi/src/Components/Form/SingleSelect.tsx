type SingleSelectProps = {
    question: { fi: string; en: string } | undefined;
    placeholder: { fi: string; en: string } | undefined;
    answers: { id: string; name: { fi: string; en: string } }[] | undefined;
    language: "fi" | "en";
    value: string;
    onChange: (value: string) => void;
};

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
};

export default SingleSelect;

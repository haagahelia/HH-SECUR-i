import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
type Option = {
    id: string;
    fi: string;
    en: string;
    [key: string]: any;
};

type MultiChoiceProps = {
    question: any;
    answers: Option[];
    language: string;
    value: string[];
    onChange: (value: string[]) => void;
};


const MultiChoice = ({
    question,
    answers,
    language,
    value,
    onChange,
}: MultiChoiceProps) => {
    const handleToggle = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter((v) => v !== id));
        } else {
            onChange([...value, id]);
        }
    };
    return (
        <FormControl>
            <FormLabel>{question[language]}</FormLabel>

            {answers.map((option) => (
                <FormControlLabel
                    key={option.id}
                    control={
                        <Checkbox
                            checked={value.includes(option.id)}
                            onChange={() => handleToggle(option.id)}
                        />
                    }
                    label={option[language]}
                />
            ))}
        </FormControl>
    );
};

export default MultiChoice;
import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
type Option = {
    code: string;
    fi: string;
    en: string;
    [key: string]: any;
};

type MultiChoiceProps = {
    id: string;
    question: any;
    answers: Option[] | undefined;
    language: string;
    value: string[];
    onChange: (value: string[]) => void;
};


const MultiChoice = ({
    id,
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
            <FormLabel>{question?.[language]}</FormLabel>

            {answers?.map((option) => (
                <FormControlLabel
                    key={`${id ?? question[language]}-${option.code}`}
                    control={
                        <Checkbox
                            checked={value.includes(option.code)}
                            onChange={() => handleToggle(option.code)}
                        />
                    }
                    label={option[language]}
                />
            ))}
        </FormControl>
    );
};

export default MultiChoice;
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type SingleChoiceProps = {
    id: string;
    question: any;
    answers: any[] | undefined;
    language: "fi" | "en";
    value: string;
    onChange: (value: string) => void;
};

const SingleChoice = ({
    id,
    question,
    answers,
    language,
    value,
    onChange,
}: SingleChoiceProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    return (
        <div>
            <FormControl>
                <FormLabel id={`single-choice-${id}`}>{question?.[language]}</FormLabel>
                <RadioGroup
                    aria-labelledby={`controlled-radio-buttons-group-${id}`}
                    name={`controlled-radio-buttons-group-${id}`}
                    value={value}
                    onChange={handleChange}
                >
                    {answers?.map((singleOption: any) => (
                        <FormControlLabel
                            key={`${id ?? question[language]}-${singleOption.code}`}
                            value={singleOption.code}
                            control={<Radio />}
                            label={singleOption[language]}
                        />
                    ))}

                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default SingleChoice;
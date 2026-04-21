import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type SingleChoiceProps = {
    question: any;
    answers: any[];
    language: "fi" | "en";
    value: string;
    onChange: (value: string) => void;
};

const SingleChoice = ({
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
                <FormLabel id={`single-choice- ${question}`}>{question[language]}</FormLabel>
                <RadioGroup
                    aria-labelledby={`controlled-radio-buttons-group-${question}`}
                    name={`controlled-radio-buttons-group-${question}`}
                    value={value}
                    onChange={handleChange}
                >
                    {answers.map((singleOption: any) => (
                        <FormControlLabel
                            value={singleOption.id}
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
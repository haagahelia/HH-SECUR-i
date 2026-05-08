type SingleSelectProps = {
    question: any;
    placeholder: any;
    answers: any[];
    language: "fi" | "en";
    value: string;
    onChange: (value: string) => void;
};

const SingleSelect = ({
    question,
    placeholder,
    answers,
    language,
    value,
    onChange,
}: SingleSelectProps) => {
    return (
        <>
            <p>{question[language]}</p>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{placeholder[language]}</option>

                {answers.map((answer) => (
                    <option key={answer.id} value={answer.id}>
                        {answer.name[language]}
                    </option>
                ))}

            </select>
        </>
    );
};

export default SingleSelect;

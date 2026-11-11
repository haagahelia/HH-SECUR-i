type SingleQuestionSummaryProps = {
    question: any;
    answers: any[] | undefined;
    language: "fi" | "en";
    value: string;
};

const SingleQuestionSummary = ({
    question,
    answers,
    language,
    value,
}: SingleQuestionSummaryProps) => {
    const selectedAnswer = answers?.find((answer) => answer.code === value);
    return (
        <>
            <p><b>{question?.[language]}</b></p>
            {selectedAnswer &&
                <p>{selectedAnswer[language]}</p>
            }
        </ >
    );
};

export default SingleQuestionSummary;
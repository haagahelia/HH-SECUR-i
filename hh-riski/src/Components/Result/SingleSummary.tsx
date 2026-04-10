import { Box } from "@mui/material";
import { useState } from "react";

type SingleQuestionSummaryProps = {
    question: any;
    answers: any[];
    language: "fi" | "en";
    value: string;
};

const SingleQuestionSummary = ({
    question,
    answers,
    language,
    value,
}: SingleQuestionSummaryProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState(answers.find((answer) => answer.id === value))

    return (
        <>
            <p><b>{question[language]}</b></p>
            {selectedAnswer &&
                <p>{selectedAnswer[language]}</p>
            }
        </ >
    );
};

export default SingleQuestionSummary;
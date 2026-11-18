import { Typography } from "@mui/material";
import { Text, View } from "@react-pdf/renderer";
import { PDFstyles } from "../../PDFstyles";

type SingleQuestionSummaryProps = {
    question: any;
    answers: any[] | undefined;
    language: "fi" | "en";
    value: string;
};

export const SingleQuestionSummary = ({
    question,
    answers,
    language,
    value,
}: SingleQuestionSummaryProps) => {
    const selectedAnswer = answers?.find((answer) => answer.code === value);
    return (
        <>
            <Typography fontWeight="bold">{question?.[language]}</Typography>
            {selectedAnswer &&
                <Typography>{selectedAnswer[language]}</Typography>
            }
        </ >
    );
};

export const SingleQuestionSummaryPDF = ({
    question,
    answers,
    language,
    value,
}: SingleQuestionSummaryProps) => {
    const selectedAnswer = answers?.find((answer) => answer.code === value);
    return (
        <View style={PDFstyles.summaryListP}>
            <Text style={PDFstyles.bold}>{question?.[language]}</Text>
            {selectedAnswer &&
                <Text>{selectedAnswer[language]}</Text>
            }
        </View>
    );
};


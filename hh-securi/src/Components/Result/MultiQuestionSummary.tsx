import { List, ListItem, Typography } from "@mui/material";
import { Text, View } from "@react-pdf/renderer";
import { PDFstyles } from "../../PDFstyles";

type MultiQuestionSummaryProps = {
  question: any;
  answers: any[] |undefined;
  language: "fi" | "en";
  values: string[];
};

export const MultiQuestionSummary = ({
  question,
  answers,
  language,
  values,
}: MultiQuestionSummaryProps) => {
  const selectedAnswers = answers?.filter((answer) =>
    values.includes(answer.code)
  );

  return (
    <>
      <Typography fontWeight="bold">{question?.[language]}</Typography>

      {selectedAnswers && selectedAnswers.length > 0 ? (
        <List sx={{padding: "0px"}}>
          {selectedAnswers?.map((answer) => (
            <ListItem key={answer.code}>{answer[language]}</ListItem>
          ))}
        </List>
      ) : (
        <Typography>{language === "fi" ? "Ei valittu" : "Not selected"}</Typography>
      )}
    </>
  );
};

export const MultiQuestionSummaryPDF = ({
  question,
  answers,
  language,
  values,
}: MultiQuestionSummaryProps) => {
  const selectedAnswers = answers?.filter((answer) =>
    values.includes(answer.code)
  );

  return (
    <View style={PDFstyles.summaryListP}>
      <Text style={PDFstyles.bold}>{question?.[language]}</Text>

      {selectedAnswers && selectedAnswers.length > 0 ? (
        <View style={PDFstyles.summaryListUl}>
          {selectedAnswers?.map((answer) => (
            <Text key={answer.code}>{answer[language]}</Text>
          ))}
        </View>
      ) : (
        <Text>{language === "fi" ? "Ei valittu" : "Not selected"}</Text>
      )}
    </View>
  );
};


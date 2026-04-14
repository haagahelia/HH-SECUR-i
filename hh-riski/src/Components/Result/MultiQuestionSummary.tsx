type MultiQuestionSummaryProps = {
  question: any;
  answers: any[];
  language: "fi" | "en";
  values: string[];
};

const MultiQuestionSummary = ({
  question,
  answers,
  language,
  values,
}: MultiQuestionSummaryProps) => {
  const selectedAnswers = answers.filter((answer) =>
    values.includes(answer.id)
  );

  return (
    <>
      <p><b>{question[language]}</b></p>

      {selectedAnswers.length > 0 ? (
        <ul>
          {selectedAnswers.map((answer) => (
            <li key={answer.id}>{answer[language]}</li>
          ))}
        </ul>
      ) : (
        <p>{language === "fi" ? "Ei valittu" : "Not selected"}</p>
      )}
    </>
  );
};

export default MultiQuestionSummary;
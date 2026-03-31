import { Paper, Typography } from "@mui/material";

type InfoBoxProps = {
  language: "fi" | "en";
};

const InfoBox = ({ language }: InfoBoxProps) => {
  return (
    <Paper
      sx={{
        backgroundColor: "#d9edf7",
        padding: 2,
        border: "1px solid #bce8f1",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {language === "fi"
          ? "Tervetuloa käyttämään Haaga-Helian kansainvälisen yhteistyön riskiarviointisovellusta. Täyttämällä arvioitavan yhteistyön perustiedot, saat arvion sekä yhteistyön kokonaisriskitasosta että keskeisten kv-yhteistyön yksittäisistä riskeistä. Lisäksi saat ohjeita ja lisätietoja tunnistettujen riskien hallitsemiseksi. Sovellus on tarkoitettu tutkimus-, opetus- ja liikkuvuusyhteistyön arvioimiseen, ja sen käyttäminen muihin tarkoituksiin ei ole suotavaa. Sovellukseen liittyviä kommentteja ja kysymyksiä voit lähettää: esimerkki-osoite@helsinki.fi"
    : "Welcome to the Haaga-Helia international cooperation risk assessment tool. By filling in the basic information of the cooperation being assessed, you will receive an evaluation of both the overall risk level of the cooperation and the key individual risks related to international cooperation. In addition, you will receive guidance and further information for managing identified risks. The tool is intended for assessing research, education, and mobility cooperation, and its use for other purposes is not recommended. You can send comments and questions related to the tool to: example-address@helsinki.fi"}
      </Typography>
    </Paper>
  );
};

export default InfoBox;
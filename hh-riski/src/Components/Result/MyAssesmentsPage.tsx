import { useEffect, useMemo, useState } from "react";
import Navbar from "../Layout/Navbar";
import { useFormAnswers } from "../../context/FormAnswersContext";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { DeleteOutline, Search, West } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type Assessment = {
  id: string;
  createdAt: string;
  riskLevel: 1 | 2 | 3;

  projectName: string;
  projectDescription: string;
  selectedCountry: string;
  selectedOrganization: string;
  duration: string;
  hhRole: string;
  consortium: string;
  history: string;
  organizationType: string;
  contractStatus: string;
  funding: string;
  liability: string;
  personalInformation: string;
  dualUse: string;
  ethics: string;
  cooperationType: string[];
  selectedLanguage: "fi" | "en";

  savedBy?: {
    id?: string;
    username?: string;
  };
};

const getRowColor = (level: number) => {
  if (level === 1) return "#cfeecf";
  if (level === 2) return "#eef0bf";
  if (level === 3) return "#f3d0d0";
  return "#f3f4f6";
};

const getRiskCircleColor = (level: number) => {
  if (level === 1) return "#44b12f";
  if (level === 2) return "#e5de00";
  if (level === 3) return "#e00000";
  return "#9ca3af";
};

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);

  return {
    date: date.toLocaleDateString("fi-FI"),
    time: date.toLocaleTimeString("fi-FI", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const MyAssessmentsPage = () => {
  const navigate = useNavigate();

  const {
    selectedLanguage,
    setSelectedLanguage,
    setSelectedCountry,
    setSelectedOrganization,
    setProjectName,
    setProjectDescription,
    setDuration,
    setHhRole,
    setConsortium,
    setHistory,
    setOrganizationType,
    setContractStatus,
    setFunding,
    setLiability,
    setPersonalInformation,
    setDualUse,
    setEthics,
    setCooperationType,
  } = useFormAnswers();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("assessments");
      const data = raw ? JSON.parse(raw) : [];
      setAssessments(data);
    } catch {
      setAssessments([]);
    }
  }, []);

  const applyAssessmentToContext = (assessment: Assessment) => {
    setSelectedLanguage(assessment.selectedLanguage);
    setSelectedCountry(assessment.selectedCountry);
    setSelectedOrganization(assessment.selectedOrganization);
    setProjectName(assessment.projectName);
    setProjectDescription(assessment.projectDescription);
    setDuration(assessment.duration);
    setHhRole(assessment.hhRole);
    setConsortium(assessment.consortium);
    setHistory(assessment.history);
    setOrganizationType(assessment.organizationType);
    setContractStatus(assessment.contractStatus);
    setFunding(assessment.funding);
    setLiability(assessment.liability);
    setPersonalInformation(assessment.personalInformation);
    setDualUse(assessment.dualUse);
    setEthics(assessment.ethics);
    setCooperationType(assessment.cooperationType);
  };

  const openAssessmentResults = (assessment: Assessment) => {
    applyAssessmentToContext(assessment);
    navigate("/results");
  };

  const editAssessment = (assessment: Assessment) => {
    applyAssessmentToContext(assessment);
    navigate("/");
  };

  const deleteAssessment = (id: string) => {
    const updated = assessments.filter((item) => item.id !== id);
    setAssessments(updated);
    localStorage.setItem("assessments", JSON.stringify(updated));
  };

  const filteredAssessments = useMemo(() => {
    return assessments.filter((item) =>
      item.projectName.toLowerCase().includes(search.toLowerCase())
    );
  }, [assessments, search]);

  return (
    <>
      <Navbar language={selectedLanguage} setLanguage={setSelectedLanguage} />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f3f3f3",
          pt: 2,
        }}
      >
        <Box
          sx={{
            borderTop: "1px solid #8f8f8f",
            borderBottom: "1px solid #8f8f8f",
            px: 4,
            py: 4,
            backgroundColor: "#f3f3f3",
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            startIcon={<West />}
            variant="outlined"
            sx={{
              color: "#2d6d9f",
              borderColor: "#2d6d9f",
              backgroundColor: "#f8f8f8",
              px: 2.5,
              py: 1.25,
              boxShadow: "0 3px 8px rgba(0,0,0,0.18)",
              textTransform: "none",
              fontSize: "1.05rem",
            }}
          >
            {selectedLanguage === "fi"
              ? "Luo uusi riskiarvio"
              : "Create new risk assessment"}
          </Button>
        </Box>

        <Box sx={{ px: 4, py: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 400, mb: 3 }}>
            {selectedLanguage === "fi"
              ? "Aikaisemmat riskiarviosi"
              : "Previous risk assessments"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
            }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                selectedLanguage === "fi"
                  ? "Hae projektia nimellä..."
                  : "Search by project name..."
              }
              size="small"
              sx={{
                width: 360,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      borderBottom: "1px solid #bcbcbc",
                      backgroundColor: "#f3f3f3",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      color: "#1f1f1f",
                    },
                  }}
                >
                  <TableCell>
                    {selectedLanguage === "fi"
                      ? "Yhteistyöprojektin nimi ↕"
                      : "Project name ↕"}
                  </TableCell>

                  <TableCell>
                    {selectedLanguage === "fi" ? "Päivämäärä ↕" : "Date ↕"}
                  </TableCell>

                  <TableCell>
                    {selectedLanguage === "fi"
                      ? "Kokonaisriskitaso ↕"
                      : "Overall risk level ↕"}
                  </TableCell>

                  <TableCell>
                    {selectedLanguage === "fi" ? "Toiminnot" : "Actions"}
                  </TableCell>

                  <TableCell>
                    {selectedLanguage === "fi" ? "Poista" : "Delete"}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredAssessments.map((item) => {
                  const formatted = formatDateTime(item.createdAt);

                  return (
                    <TableRow
                      key={item.id}
                      sx={{
                        backgroundColor: getRowColor(item.riskLevel),
                        "& td": {
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          py: 2,
                        },
                      }}
                    >
                      <TableCell>
                        <Button
                          onClick={() => openAssessmentResults(item)}
                          variant="text"
                          sx={{
                            color: "#145b87",
                            textDecoration: "underline",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            p: 0,
                            minWidth: 0,
                            textTransform: "none",
                            justifyContent: "flex-start",
                          }}
                        >
                          {item.projectName}
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {formatted.date}
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {formatted.time}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            backgroundColor: getRiskCircleColor(item.riskLevel),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "1.35rem",
                            color: "#000",
                            boxShadow: "0 3px 8px rgba(0,0,0,0.28)",
                          }}
                        >
                          {item.riskLevel}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => editAssessment(item)}
                          sx={{
                            color: "#2d6d9f",
                            textTransform: "uppercase",
                            fontSize: "0.98rem",
                            p: 0,
                            minWidth: 0,
                          }}
                        >
                          {selectedLanguage === "fi"
                            ? "PÄIVITÄ RISKIARVIO"
                            : "UPDATE ASSESSMENT"}
                        </Button>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => deleteAssessment(item.id)}
                          sx={{
                            width: 42,
                            height: 42,
                            border: "2px solid #111",
                            borderRadius: 0,
                            backgroundColor: "#fff",
                          }}
                        >
                          <DeleteOutline sx={{ color: "#111" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredAssessments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography sx={{ py: 2 }}>
                        {selectedLanguage === "fi"
                          ? "Tallennettuja riskiarvioita ei löytynyt."
                          : "No saved risk assessments found."}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default MyAssessmentsPage;
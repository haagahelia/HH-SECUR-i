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
    TableSortLabel
} from "@mui/material";
import { DeleteOutline, Search, West } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import type { Organization, Country } from "../../types";
import { useCurrentUser } from "../../context/AuthContext";
import { getReports, deleteReport, type ReportListItem } from "../../services/reports";

type Assessment = {
    id: string;
    createdAt: string;
    riskLevel: 1 | 2 | 3;

    projectName: string;
    projectDescription: string;
    selectedCountry: Country | null;
    selectedOrganization: Organization | null;
    selectedProjectOwner?: {
        id?: string | number;
        username: string;
        name?: string;
    } | null;
    duration: string;
    hhRole: string;
    hhRoleOther?: string;
    consortium: string;
    history: string;
    organizationType: string;
    organizationTypeOther?: string;
    contractStatus: string;
    funding: string;
    exchange?: string;
    fundingSource?: string;
    fundingHistory?: string;
    organizationName?: string;
    liability: string;
    personalInformation: string;
    dualUse: string;
    ethics: string;
    cooperationType: string[];
    cooperationTypeOther?: string;
    selectedLanguage: "fi" | "en";

    savedBy?: {
        id?: string;
        username?: string;
    };
};



const getRowColor = (level: number) => {
    if (level === 1) return "rgb(255, 255, 255)";
    if (level === 2) return "rgb(255, 255, 255)";
    if (level === 3) return "rgb(255, 255, 255";
    return "#f3f4f6";
};

const getRiskCircleColor = (level: number) => {
    if (level === 1) return "#44b12f";
    if (level === 2) return "#d4d161";
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
    const { token } = useCurrentUser();
    const navigate = useNavigate();

    const {
        selectedLanguage,
        setSelectedLanguage,
        setSelectedCountry,
        setSelectedOrganization,
        setOrganizationName,
        setSelectedProjectOwner,
        setProjectName,
        setProjectDescription,
        setDuration,
        setHhRole,
        setHhRoleOther,
        setConsortium,
        setHistory,
        setOrganizationType,
        setOrganizationTypeOther,
        setContractStatus,
        setFunding,
        setExchange,
        setFundingSource,
        setFundingHistory,
        setLiability,
        setPersonalInformation,
        setDualUse,
        setEthics,
        setCooperationType,
        setCooperationTypeOther,
        clearAnswers,
    } = useFormAnswers();

    const [orderBy, setOrderBy] = useState<"name" | "created_at" | "risk">("created_at");
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const handleSort = (column: "name" | "created_at" | "risk") => {
        const isAsc = orderBy === column && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(column);
    };

    const [assessments, setAssessments] = useState<ReportListItem[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!token) return;
        getReports(token)
        .then(setAssessments)
        .catch((e) => console.error("Failed to load reports", e));
    }, [token]);

    const applyAssessmentToContext = (assessment: Assessment) => {
        setSelectedLanguage(assessment.selectedLanguage);
        setSelectedCountry(assessment.selectedCountry);
        setSelectedOrganization(
            assessment.selectedOrganization
                ? {
                    id: assessment.selectedOrganization.id,
                    countryId: assessment.selectedOrganization.countryId,
                    name: assessment.selectedOrganization.name,
                }
                : null,
        );
        setSelectedProjectOwner(assessment.selectedProjectOwner ?? null);
        setProjectName(assessment.projectName);
        setProjectDescription(assessment.projectDescription);
        setDuration(assessment.duration);
        setHhRole(assessment.hhRole);
        setHhRoleOther(assessment.hhRoleOther ?? "");
        setConsortium(assessment.consortium);
        setHistory(assessment.history);
        setOrganizationType(assessment.organizationType);
        setOrganizationTypeOther(assessment.organizationTypeOther ?? "");
        setContractStatus(assessment.contractStatus);
        setFunding(assessment.funding);
        setOrganizationName(assessment.organizationName ?? "");
        setExchange(assessment.exchange ?? "");
        setFundingSource(assessment.fundingSource ?? "");
        setFundingHistory(assessment.fundingHistory ?? "");
        setLiability(assessment.liability);
        setPersonalInformation(assessment.personalInformation);
        setDualUse(assessment.dualUse);
        setEthics(assessment.ethics);
        setCooperationType(assessment.cooperationType);
        setCooperationTypeOther(assessment.cooperationTypeOther ?? "");
    };

    const openAssessmentResults = (assessment: Assessment) => {
        applyAssessmentToContext(assessment);
        navigate("/results");
    };



    const deleteAssessment = async (id: number) => {
    if (!token) return;
    try {
        await deleteReport(token, id);
        setAssessments((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
        console.error("Failed to delete report", e);
    }
    };

    const filteredAssessments = useMemo(() => {
        const filtered = assessments.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        const sorted = [...filtered].sort((a, b) => {
            let comparison = 0;

            if (orderBy === "name") {
                comparison = a.name.localeCompare(b.name);
            } else if (orderBy === "created_at") {
                comparison =
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            } else if (orderBy === "risk") {
                comparison = a.risk - b.risk;
            }

            return order === "asc" ? comparison : -comparison;
        });

        return sorted;
    }, [assessments, search, orderBy, order]);
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
                        onClick={clearAnswers}
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
                    <Typography variant="h4" sx={{ color: "#1f1f1f", fontWeight: 400, mb: 3 }}>
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
                                        <TableSortLabel
                                            active={orderBy === "name"}
                                            direction={orderBy === "name" ? order : "asc"}
                                            onClick={() => handleSort("name")}
                                            hideSortIcon={false}
                                        >
                                            {selectedLanguage === "fi"
                                                ? "Yhteistyöprojektin nimi"
                                                : "Project name"}
                                        </TableSortLabel>
                                    </TableCell>

                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "created_at"}
                                            direction={orderBy === "created_at" ? order : "asc"}
                                            onClick={() => handleSort("created_at")}
                                            hideSortIcon={false}
                                        >
                                            {selectedLanguage === "fi" ? "Päivämäärä" : "Date"}
                                        </TableSortLabel>
                                    </TableCell>

                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "risk"}
                                            direction={orderBy === "risk" ? order : "asc"}
                                            onClick={() => handleSort("risk")}
                                            hideSortIcon={false}
                                        >
                                            {selectedLanguage === "fi"
                                                ? "Kokonaisriskitaso"
                                                : "Overall risk level"}
                                        </TableSortLabel>
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
                                    const formatted = formatDateTime(item.created_at);

                                    return (
                                        <TableRow
                                            key={item.id}
                                            sx={{
                                                backgroundColor: getRowColor(item.risk),
                                                "& td": {
                                                    borderBottom: "2px solid #fbf6f6",
                                                    py: 2,
                                                },
                                            }}
                                        >
                                            <TableCell>
                                                <Button
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
                                                    {item.name}
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
                                                        backgroundColor: getRiskCircleColor(item.risk),
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontWeight: 700,
                                                        fontSize: "1.35rem",
                                                        color: "#000",
                                                        boxShadow: "0 3px 8px rgba(0,0,0,0.28)",
                                                    }}
                                                >
                                                    {item.risk}
                                                </Box>
                                            </TableCell>

                                            <TableCell>

                                                {selectedLanguage === "fi"
                                                    ? "Kesken"
                                                    : "In progress"}

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
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useCurrentUser } from "../context/AuthContext";
import { useFormAnswers } from "../context/FormAnswersContext";
import {
    createAdminRecord,
    deleteAdminRecord,
    getAdminRecords,
    updateAdminRecord,
    type AdminRecord,
    type AdminResource,
} from "../services/admin";

type Field = { key: string; label: string; type?: "text" | "number" | "password" };

const fields: Record<AdminResource, Field[]> = {
    users: [
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "password", label: "Password", type: "password" },
    ],
    countries: [
        { key: "code", label: "Code" },
        { key: "fi", label: "Finnish name" },
        { key: "en", label: "English name" },
        { key: "dataYear", label: "Data year", type: "number" },
        { key: "corruption", label: "Corruption", type: "number" },
        { key: "security", label: "Security", type: "number" },
        { key: "academicFreedom", label: "Academic freedom", type: "number" },
        { key: "politicalStability", label: "Political stability", type: "number" },
        { key: "development", label: "Development", type: "number" },
        { key: "gdpr", label: "GDPR", type: "number" },
        { key: "sanctions", label: "Sanctions", type: "number" },
        { key: "ruleOfLaw", label: "Rule of law", type: "number" },
    ],
    organizations: [
        { key: "fi", label: "Finnish name" },
        { key: "en", label: "English name" },
        { key: "country_code", label: "Country code" },
    ],
};

const labels: Record<AdminResource, { en: string; fi: string }> = {
    users: { en: "Users", fi: "Käyttäjät" },
    countries: { en: "Countries", fi: "Maat" },
    organizations: { en: "Organizations", fi: "Organisaatiot" },
};

const AdminManagementPage = ({ resource }: { resource: AdminResource }) => {
    const { user, token } = useCurrentUser();
    const { selectedLanguage } = useFormAnswers();
    const isFinnish = selectedLanguage === "fi";
    const supportsMutations = resource === "users";
    const resourceFields = fields[resource];
    const [records, setRecords] = useState<AdminRecord[]>([]);
    const [editing, setEditing] = useState<AdminRecord | null>(null);
    const [form, setForm] = useState<AdminRecord>({});
    const [error, setError] = useState("");

    const load = () => {
        if (!token) return;
        getAdminRecords(token, resource).then(setRecords).catch((e: unknown) => {
            console.error(`Failed to load ${resource}`, e);
            setError(isFinnish ? "Tietojen lataus epäonnistui." : "Failed to load data.");
        });
    };

    useEffect(load, [token, resource]);

    const title = labels[resource][isFinnish ? "fi" : "en"];
    const recordId = (record: AdminRecord) => String(record.id ?? record.username ?? record.code ?? "");
    const columns = useMemo(() => resourceFields.filter((field) => field.type !== "password"), [resourceFields]);

    if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;

    const startCreate = () => {
        setEditing(null);
        setForm({});
        setError("");
    };

    const startEdit = (record: AdminRecord) => {
        setEditing(record);
        setForm({ ...record });
        setError("");
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (!token) return;
        try {
            if (editing) {
                await updateAdminRecord(token, resource, recordId(editing), form);
            } else {
                await createAdminRecord(token, resource, form);
            }
            setEditing(null);
            setForm({});
            setError("");
            load();
        } catch (e) {
            console.error(`Failed to save ${resource}`, e);
            setError(isFinnish ? "Tallennus epäonnistui." : "Failed to save changes.");
        }
    };

    const remove = async (record: AdminRecord) => {
        if (!token || !window.confirm(isFinnish ? "Poistetaanko tietue?" : "Delete this record?")) return;
        try {
            await deleteAdminRecord(token, resource, recordId(record));
            setRecords((current) => current.filter((item) => recordId(item) !== recordId(record)));
        } catch (e) {
            console.error(`Failed to delete ${resource}`, e);
            setError(isFinnish ? "Poisto epäonnistui." : "Failed to delete record.");
        }
    };

    return (
        <>
            <Navbar />
            <Box component="main" sx={{ maxWidth: 1400, mx: "auto", px: 2, pb: 10 }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ mb: 3 }} gap={2}>
                    <Typography component="h1" variant="h4">{title}</Typography>
                    <Button component={RouterLink} to="/dashboard" variant="outlined">
                        {isFinnish ? "Takaisin kojelaudalle" : "Back to dashboard"}
                    </Button>
                </Stack>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {supportsMutations ? (
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {editing ? (isFinnish ? "Muokkaa" : "Edit") : (isFinnish ? "Lisää uusi" : "Add new")}
                        </Typography>
                        <Box component="form" onSubmit={submit}>
                            <Stack direction={{ xs: "column", sm: "row" }} flexWrap="wrap" gap={2}>
                                {resourceFields.map((field) => (
                                    <TextField
                                        key={field.key}
                                        label={field.key === "password" && editing
                                            ? (isFinnish ? "Salasana (vain uuden käyttäjän luonti)" : "Password (new users only)")
                                            : field.label}
                                        type={field.type ?? "text"}
                                        value={form[field.key] ?? ""}
                                        disabled={field.key === "password" && Boolean(editing)}
                                        helperText={field.key === "password" && editing
                                            ? (isFinnish ? "Salasanan vaihto otetaan käyttöön backendissä myöhemmin." : "Password changes will be enabled when backend hashing is available.")
                                            : undefined}
                                        onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                                        sx={{ flex: "1 1 220px" }}
                                    />
                                ))}
                            </Stack>
                            <Stack direction="row" gap={1} sx={{ mt: 2 }}>
                                <Button type="submit" variant="contained">{isFinnish ? "Tallenna" : "Save"}</Button>
                                {editing && <Button onClick={startCreate}>{isFinnish ? "Peruuta" : "Cancel"}</Button>}
                            </Stack>
                        </Box>
                    </Paper>
                ) : (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        {isFinnish
                            ? "Tietojen lisääminen, muokkaaminen ja poistaminen otetaan käyttöön backend-reittien valmistuttua."
                            : "Add, edit, and delete actions will be enabled when the backend routes are available."}
                    </Alert>
                )}
                <Paper sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((field) => <TableCell key={field.key}>{field.label}</TableCell>)}
                                {supportsMutations && <TableCell />}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={recordId(record)}>
                                    {columns.map((field) => <TableCell key={field.key}>{String(record[field.key] ?? "")}</TableCell>)}
                                    {supportsMutations && (
                                        <TableCell>
                                            <Button onClick={() => startEdit(record)}>{isFinnish ? "Muokkaa" : "Edit"}</Button>
                                            <Button color="error" onClick={() => remove(record)}>{isFinnish ? "Poista" : "Delete"}</Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </>
    );
};

export default AdminManagementPage;

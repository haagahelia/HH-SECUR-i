import type { RiskCalculationRequest, RiskCalculationResponse } from "../types";
import { authenticatedFetch } from "../util/authenticatedFetch";

const url = import.meta.env.VITE_BACKEND_URL;

export async function calculateRisk(answers: RiskCalculationRequest, token: string) {
    const response = await authenticatedFetch(`${url}/calculaterisk`, token, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(answers)
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("AUTHENTICATION_ERROR");
        }
        if (response.status === 422) {
            throw new Error("INVALID_REQUEST_BODY");
        }
    }

    return data.report as RiskCalculationResponse;
};

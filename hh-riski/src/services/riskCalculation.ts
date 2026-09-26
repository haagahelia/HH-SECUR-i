import type { RiskCalculationRequest, RiskCalculationResponse } from "../types";

const url = import.meta.env.VITE_BACKEND_URL;

export async function calculateRisk(answers: RiskCalculationRequest, token: string) {
    const parsedToken = token ? JSON.parse(token) : null
    
    const response = await fetch (`${url}/calculaterisk`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${parsedToken}`
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

    return data as RiskCalculationResponse;
};

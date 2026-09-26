export type User = {
    id?: string | number,
    username: string,
    name?: string,
}

export type RiskCalculationRequest = {
    hhrole: string;
    collaborationtype: string[];
    country: string;
    organization: string | null;
    organizationtype: string;
    history: string;
    contract: string;
    funding: string;
    exchange: string;
    liability: string;
    personalinformation: string;
    dualuse: string;
    ethics: string;
    duration: string;
    organizationother?: string;
    collaborationtypeother?: string;
    additionalinformation?: string;
}

export type RiskCalculationResponse = {
    collaboration: {
        title: {
            fi: string;
            en: string;
        }
        risk: number;
        description: {
            fi: string;
            en: string;
        }
    },
    country: {
        overall: {
            title: {
                fi: string;
                en: string;
            }
            risk: number
            description: {
                fi: string;
                en: string;
            }
        },
        corruption: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        security: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        academicfreedom: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        politicalstability: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        development: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        gdpr: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        sanctions: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        ruleoflaw: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
    },
    organization: {
        title: {
            fi: string;
            en: string;
        }
        risk: number;
        description: {
            fi: string;
            en: string;
        }
    },
    financial: {
        overall: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        exchange: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
        scope: {
            title: {
                fi: string;
                en: string;
            }
            risk: number;
            description: {
                fi: string;
                en: string;
            }
        },
    },
    dualuse: {
        title: {
            fi: string;
            en: string;
        }
        risk: number;
        description: {
            fi: string;
            en: string;
        }
    },
    ethics: {
        title: {
            fi: string;
            en: string;
        }
        risk: number;
        description: {
            fi: string;
            en: string;
        }
    },
    organizationother?: string;
    collaborationtypeother?: string;
    additionalinformation?: string
    realCalculationImpementedFor: string[]
};

export type Country = {
    id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        overall: 0 | 1 | 2 | 3,
        corruption: 0 | 1 | 2 | 3,
        security: 0 | 1 | 2 | 3,
        academicFreedom: 0 | 1 | 2 | 3,
        politicalStability: 0 | 1 | 2 | 3,
        development: 0 | 1 | 2 | 3,
        GDPR: 0 | 1 | 2 | 3,
        sanctions: 0 | 1 | 2 | 3,
        ruleOfLaw: 0 | 1 | 2 | 3
    }
}

export type CountryRaw = {
    id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        corruption: number,
        security: 1 | 2 | 3,
        academicFreedom: number,
        politicalStability: number,
        development: number,
        GDPR: number,
        sanctions: number,
        ruleOfLaw: number
    },
    dataYear: number
}

export type Organization = {
    id: string
    name: {
        fi: string
        en: string
    }
    countryId: string
}

export type Question = {
    question: {
        id: string,
        fi: string,
        en: string
    },
    answers: { id: string, fi: string, en: string }[]
}
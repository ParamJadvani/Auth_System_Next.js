export const genderList = ["male", "female", "other"];
export const maritalStatusList = ["unmarried", "engaged", "married"];
export const statusList = ["active", "inactive"];
export const accountType = ["none", "savings", "current", "salary"];
export const bloodGroupList = ["none", "a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"];
export const contributionList = [
    "pf_contribution",
    "abry_contribution",
    "esi_contribution",
] as const;
export const salary_Contract_Period = ["none", "3", "6", "8", "12", "15", "18", "24"];

export const processDate = (dateStr?: string | null, type: "date" | "month" = "date"): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return type === "date" ? date.toISOString().split("T")[0] : date.toISOString().slice(0, 7);
};

export const IntervieweesStatusList = [
    { label: "Select Status", value: "none" },
    { label: "Not Connected", value: "-1" },
    { label: "Selected", value: "0" },
    { label: "Rejected", value: "1" },
    { label: "Ongoing", value: "2" },
    { label: "Skipped", value: "3" },
    { label: "1st Round", value: "4" },
    { label: "On hold", value: "5" },
    { label: "Lined-up", value: "6" },
];

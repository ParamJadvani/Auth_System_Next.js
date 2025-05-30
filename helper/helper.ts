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

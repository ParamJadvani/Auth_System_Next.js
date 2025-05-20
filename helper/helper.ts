export const genderList = ["male", "female", "other"];
export const maritalStatusList = ["unmarried", "engaged", "married"];
export const statusList = ["active", "inactive"];
export const accountType = ["savings", "current", "salary"];
export const bloodGroupList = ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"] as const;
export const contributionList = [
    "pf_contribution",
    "abry_contribution",
    "esi_contribution",
] as const;

export const processDate = (dateStr?: string | null, type: "date" | "month" = "date"): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return type === "date" ? date.toISOString().split("T")[0] : date.toISOString().slice(0, 7);
};

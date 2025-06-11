import API from "@/lib/axios";

export default function useReports() {
    return {
        viewSummaryReport: async (timeFormate: string, report_name: string, value: string) => {
            try {
                const defaultURL = `/reports/${timeFormate}/${report_name}/summary?${value}`;
                const res = await API.get(`${defaultURL}`);
                return res.data;
            } catch {
                return null;
            }
        },

        downloadSummaryReport: async (timeFormate: string, report_name: string, value: string) => {
            try {
                const defaultURL = `/reports/${timeFormate}/${report_name}/summary?${value}`;
                const res = await API.get(`${defaultURL}`, {
                    responseType: "blob",
                });
                return res.data;
            } catch {
                return null;
            }
        },
    };
}

"use client";
import { EditInterviewFormPage } from "@/components/interviewees/edit-form";
import useEmployees from "@/hooks/use-employees";
import useInterviewees from "@/hooks/use-Interviewees";
import { ShortEmployee } from "@/types/employees";
import { Interviewee } from "@/types/interviewees";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InterviewEditPage() {
  const params = useParams();
  const [data, setData] = useState<Interviewee | undefined>(undefined)
  const [nData, setNData] = useState<ShortEmployee[] | undefined>(undefined);
  const { getDetails, update } = useInterviewees();
  const { getShortEmployeeData } = useEmployees();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shortEmployeeData = await getShortEmployeeData();
        const intervieweeData = await getDetails(Number(params.id));
        setNData(shortEmployeeData);
        setData(intervieweeData);
      } catch { }
    };
    fetchData();
  }, [getDetails, getShortEmployeeData, params]);

  const handleUpdate = async (data: Interviewee) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "user_id" && Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`user_id[${index}]`, item.id);
        });
      } else {
        formData.append(key, value !== null ? String(value) : "");
      }
    });
    await update(data.id, formData);
  };

  return (
    <div>
      {data && nData && (
        <EditInterviewFormPage
          InterviewData={data}
          InterviewerName={nData}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

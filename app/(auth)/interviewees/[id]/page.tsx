"use client";
import useInterviewees from "@/hooks/use-Interviewees";
import { Interviewee } from "@/types/interviewees";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InterviewEditPage() {
  const params = useParams();
  const [data, setData] = useState<Interviewee | undefined>(undefined);
  const { getDetails, update } = useInterviewees();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const intervieweeData = await getDetails(Number(params.id));
        setData(intervieweeData);
      } catch {}
    };
    fetchData();
  }, [getDetails, params]);

  const handleUpdate = async (formData: Interviewee) => {
    console.log(formData.id, formData);
    // await update(formData.id, formData);
  };

  console.log(data);

  return (
    <div>
      {/* {data && <AdminForm editing={true} data={data} onSubmit={handleUpdate} />} */}
    </div>
  );
}

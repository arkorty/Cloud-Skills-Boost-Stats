import { useEffect, useState } from "react";
import { Student } from "../types/student";

const LoadStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/codex");
        if (!response.ok) throw new Error("Failed to fetch data");

        const base64Data = await response.text();
        const jsonData = atob(base64Data); 

        const data: Student[] = JSON.parse(jsonData);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return students;
};

export default LoadStudents;

import { students } from "./data/students";
import { StudentCard } from "./components/ui/student-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Student Progress Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
}

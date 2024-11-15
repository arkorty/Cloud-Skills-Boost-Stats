import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { Student } from "@/app/types/student";

export const CompactCard = ({ student }: { student: Student }) => {
  const totalAssignments =
    student.incomplete_assignments_count + student.completed_assignments_count;
  const completionPercentage =
    totalAssignments > 0
      ? (student.completed_assignments_count / totalAssignments) * 100
      : 0;

  return (
    <Card className="w-full transition duration-200 ease-in-out transform lg:hover:scale-105 lg:mb-2 shadow-lg border border-gray-700">
      <CardHeader className="flex flex-row items-center gap-3">
        <Link href={student.profile_url}>
          <Avatar className="h-16 w-16">
            <div
              className={`bg-google-blue text-2xl text-primary-foreground rounded-full w-full h-full flex items-center justify-center`}
            >
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex justify-center mb-2">
            <Link href={student.profile_url}>
              <CardTitle className="text-2xl">{student.name}</CardTitle>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-1 overflow-hidden">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Course Progress</span>
            <span>{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="text-xs text-muted-foreground mt-2">
          Completed: {student.completed_assignments_count} / {totalAssignments}
        </div>
      </CardContent>
    </Card>
  );
};

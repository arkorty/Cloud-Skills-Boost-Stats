import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap, Mail, Trophy, Clock } from "lucide-react";
import { Student } from "@/app/types/student";

export const StudentCard = ({ student }: { student: Student }) => {
  const totalAssignments =
    student.incomplete_assignments_count + student.completed_assignments_count;
  const completionPercentage =
    totalAssignments > 0
      ? (student.completed_assignments_count / totalAssignments) * 100
      : 0;

  return (
    <Card className="w-full transition duration-300 ease-in-out transform hover:scale-105 mb-3">
      <CardHeader className="flex flex-row items-center gap-4">
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
          <Link href={student.profile_url}>
            <CardTitle className="text-lg">{student.name}</CardTitle>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 overflow-hidden">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={student.profile_url}>
            <Badge className="p-2 gap-2 bg-google-green hover:bg-google-green/80">
              <Trophy className="h-5 w-5 text-google-background" />
              <span className="font-semibold text-google-background">
                {student.badges_count}
              </span>
            </Badge>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Course Progress
            </span>
            <span className="text-sm font-medium">
              {completionPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-google-yellow" />
            <h4 className="font-medium">Earned Badges</h4>
          </div>
          <ScrollArea className="h-48">
            <div className="flex flex-wrap gap-2">
              {student.badges?.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-google-lightBlue text-google-text"
                >
                  {badge}
                </Badge>
              )) || (
                <span className="text-sm text-muted-foreground">
                  No badges earned yet
                </span>
              )}
            </div>
          </ScrollArea>
        </div>

        <Tabs defaultValue="completed">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="completed">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-google-green" />
                Completed
              </div>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                In Progress
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="mt-4">
            <div className="space-y-2">
              <ScrollArea className="h-64">
                {(student.completed_assignments?.length ?? 0) > 0 ? (
                  student.completed_assignments?.map((assignment, index) => (
                    <div
                      key={index}
                      className={`py-1 text-sm ${
                        index < (student.completed_assignments?.length ?? 1) - 1
                          ? "border-b border-gray-300"
                          : ""
                      }`}
                    >
                      {assignment}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No assignments completed yet
                  </span>
                )}
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-4">
            <div className="space-y-2">
              <ScrollArea className="h-64">
                {(student.incomplete_assignments?.length ?? 0) > 0 ? (
                  student.incomplete_assignments?.map((assignment, index) => (
                    <div
                      key={index}
                      className={`py-1 text-sm ${
                        index <
                        (student.incomplete_assignments?.length ?? 1) - 1
                          ? "border-b border-gray-300"
                          : ""
                      }`}
                    >
                      {assignment}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No incomplete assignments
                  </span>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

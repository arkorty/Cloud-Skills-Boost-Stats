import React from "react";
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <div className="bg-primary text-2xl text-primary-foreground rounded-full w-full h-full flex items-center justify-center">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">{student.name}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Mail className="h-4 w-4" />
            <span>{student.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold">{student.badges_count}</span>
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

        <Tabs defaultValue="assignments">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">
                    Completed ({student.completed_assignments_count})
                  </h4>
                </div>
                <ScrollArea className="h-32">
                  {student.completed_assignments?.map((assignment, index) => (
                    <div key={index} className="py-1 text-sm">
                      {assignment}
                    </div>
                  ))}
                </ScrollArea>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <h4 className="font-medium">
                    In Progress ({student.incomplete_assignments_count})
                  </h4>
                </div>
                <ScrollArea className="h-32">
                  {student.incomplete_assignments.map((assignment, index) => (
                    <div
                      key={index}
                      className="py-1 text-sm text-muted-foreground"
                    >
                      {assignment}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-4">
            <ScrollArea className="h-[300px]">
              <div className="flex flex-wrap gap-2">
                {student.badges?.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                )) || (
                  <span className="text-sm text-muted-foreground">
                    No badges earned yet
                  </span>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

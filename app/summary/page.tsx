"use client";

import React from "react";
import LoadStudents from "../data/load-students";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, GraduationCap, Clock } from "lucide-react";

const SummaryPage = () => {
  const students = LoadStudents();

  const totalStudents = students.length;
  const completedCount = students.filter(
    (student) => student.incomplete_assignments_count === 0,
  ).length;
  const incompleteCount = totalStudents - completedCount;

  const completedPercentage =
    totalStudents > 0 ? (completedCount / totalStudents) * 100 : 0;
  const incompletePercentage =
    totalStudents > 0 ? (incompleteCount / totalStudents) * 100 : 0;

  const badgeCompletionCount: Record<string, number> = {};

  students.forEach((student) => {
    if (student.badges) {
      student.badges.forEach((badge) => {
        badgeCompletionCount[badge] = (badgeCompletionCount[badge] || 0) + 1;
      });
    }
  });

  const mostCompletedCourses = Object.entries(badgeCompletionCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <Card className="transition duration-200 ease-in-out transform shadow-lg hover:scale-105 border border-gray-400">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Course Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Students
              </span>
              <span className="text-lg font-medium">{totalStudents}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-google-green" />
                  <span className="text-sm text-muted-foreground">
                    Completed
                  </span>
                </div>
                <span className="text-lg font-medium">
                  {completedPercentage.toFixed(0)}% ({completedCount})
                </span>
              </div>
              <Progress value={completedPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">
                    Incomplete
                  </span>
                </div>
                <span className="text-lg font-medium">
                  {incompletePercentage.toFixed(0)}% ({incompleteCount})
                </span>
              </div>
              <Progress value={incompletePercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="transition duration-200 ease-in-out transform shadow-lg hover:scale-105 border border-gray-400">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Most Completed Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="space-y-4 h-48">
            {mostCompletedCourses.map(([course, count], index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm text-muted-foreground"
              >
                <span>{course}</span>
                <span className="font-medium">{count} completions</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryPage;

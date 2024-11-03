"use client";

import React from "react";
import LoadStudents from "../data/load-students";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Trophy, GraduationCap, Clock } from "lucide-react";

const Summary = () => {
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
    <div className="flex justify-center p-6">
      <div className="max-w-3xl w-full space-y-6">
        <Card className="mx-auto w-full max-w-2xl transition duration-200 ease-in-out transform shadow-lg hover:scale-105 border border-gray-400 bg-white rounded-lg">
          <CardHeader className="p-6 border-b border-gray-200">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              Course Progress Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Total Students
                  </span>
                </div>
                <span className="text-xl font-semibold text-gray-800">
                  {totalStudents}
                </span>
              </div>

              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Completed
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    {completedPercentage.toFixed(0)}% ({completedCount})
                  </span>
                </div>
                <Progress
                  value={completedPercentage}
                  className="h-2 rounded-full bg-gray-200"
                />
              </div>

              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Incomplete
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    {incompletePercentage.toFixed(0)}% ({incompleteCount})
                  </span>
                </div>
                <Progress
                  value={incompletePercentage}
                  className="h-2 rounded-full bg-gray-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mx-auto w-full max-w-2xl transition duration-200 ease-in-out transform shadow-lg hover:scale-105 border border-gray-400 bg-white rounded-lg">
          <CardHeader className="p-6 border-b border-gray-200">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              Most Completed Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {mostCompletedCourses.map(([course, count], index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 mb-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-500 h-5 w-5" />
                  <span className="text-md font-medium text-gray-700">
                    {course}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {count} completions
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Summary;

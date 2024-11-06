"use client";

import React, { useState, useEffect } from "react";
import LoadStudents from "./data/load-students";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CompactCard } from "@/components/ui/compact-card";
import { StudentCard } from "@/components/ui/student-card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  LineChart,
  PanelsTopLeft,
} from "lucide-react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const cardsPerPage = 12;
  const students = LoadStudents();

  useEffect(() => {
    const savedMode = window?.localStorage?.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    const savedMode = window?.localStorage?.getItem("isCompact") === "true";
    setIsCompact(savedMode);
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredStudents.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleViewMode = () => {
    setIsCompact((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("isCompact", newMode.toString());
      return newMode;
    });
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="w-full text-google-text p-6 rounded-lg shadow-lg border border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="BoostStats Logo"
                className="mr-4"
                width={72}
                height={72}
              />
              <h1 className="text-5xl md:text-4xl text-primary font-bold tracking-wide hidden sm:inline mb-0">
                BoostStats
              </h1>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Input
                id="student-search"
                type="text"
                placeholder="Search for a student..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-primary bg-secondary"
              />
              <p className="text-sm text-primary/80 mr-1">
                Showing {indexOfFirstCard + 1}-
                {Math.min(indexOfLastCard, filteredStudents.length)} of{" "}
                {filteredStudents.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentCards.map((student) =>
            isCompact ? (
              <CompactCard key={student.email} student={student} />
            ) : (
              <StudentCard key={student.email} student={student} />
            )
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === "..." ? (
                  <span className="px-2">...</span>
                ) : (
                  <Button
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(Number(pageNumber))}
                    className="h-8 w-8"
                  >
                    {pageNumber}
                  </Button>
                )}
              </React.Fragment>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          <Button
            onClick={toggleViewMode}
            className="h-8 w-8 rounded-full shadow-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-4"
          >
            <PanelsTopLeft></PanelsTopLeft>
          </Button>

          <Link href="/summary">
            <Button className="h-8 w-8 rounded-full shadow-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-4">
              <LineChart className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            onClick={toggleDarkMode}
            className="h-8 w-8 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-black" />
            ) : (
              <Moon className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

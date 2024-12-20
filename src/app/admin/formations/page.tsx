"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formations } from "@/util/data";
import SearchBar from "../components/table/searchBar-table";
import Pagination from "../components/table/pagination-table";
import FormationTable from "../components/table/formation/table";

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredData = formations.filter((formation) => {
    return (
      formation.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container px-2 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Formations</h1>
        <Link href="/admin/formations/add">
          <Button>Ajouter une formation</Button>
        </Link>
      </div>
      <SearchBar searchQuery={searchQuery} onSearchChange={(query) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }} />
      <FormationTable formations={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

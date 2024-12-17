"use client";

import { Suspense, useEffect, useState } from "react";
import { inscriptions } from "@/util/data";
import Pagination from "../components/table/pagination-table";
import InscriptionsTable from "../components/table/clients/table";
import SearchBar from "../components/table/searchBar-table";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";

export default function ClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 30;
  const searchParams = useSearchParams(); // Utilisez useSearchParams()
  const type = searchParams.get("type") 
  const id = searchParams.get("id") 


  const filteredByUrlParams = inscriptions.filter((inscription) => {
    if (id && type) {
      return (
        inscription.entityId === id && 
        inscription.entityType === type
      );
    }
    return true; // Si aucun paramètre n'est spécifié, ne filtre pas
  });

  // Appliquer les filtres basés sur la barre de recherche
  const filteredBySearch = filteredByUrlParams.filter((inscription) => {
    return (
      inscription.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.id === searchQuery
    );
  });

  const totalPages = Math.ceil(filteredBySearch.length / itemsPerPage);
  const paginatedData = filteredBySearch.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    // Réinitialiser la page actuelle si les paramètres de l'URL changent
    setCurrentPage(1);
  }, [id, type]);

  return (
    <Suspense fallback={<Loading></Loading>}>
      <div className="container px-2 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inscriptions</h1>
      </div>
      <SearchBar searchQuery={searchQuery} onSearchChange={(query) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }} />
      <InscriptionsTable inscriptions={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
    </Suspense>
  );
}

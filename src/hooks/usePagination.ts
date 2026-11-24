import { useState } from "react";
import type {Product} from '../types/Product'



function usePagination(sortedAndFilteredProducts : Product[], productsPerPage : number) {
    const [currentPage, setCurrentPage] = useState(1);
    const visiblePages : (number | string)[] = [];



    const totalPages = Math.ceil(
            sortedAndFilteredProducts.length / productsPerPage
        )

    let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1 )

        // Always show the first page
        visiblePages.push(1);

        if (startPage > 2) {
            visiblePages.push("...");
        }

        // Add pages around the current page
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        // Show dots if there are hidden pages after
        if (endPage < totalPages - 1) {
            visiblePages.push("...");
        }

        // Always show the last page (if there is more than one)
        if (totalPages > 1) {
            visiblePages.push(totalPages);
        }
        

        // Calculate which products to display
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = sortedAndFilteredProducts.slice(
            startIndex,
            endIndex
        );

        // Get products for the current page

        const startItem = startIndex + 1;
        const endItem = Math.min(
            startIndex + currentProducts.length,
            sortedAndFilteredProducts.length
        );

        // ===== Pagination Actions =====
    const handleNextPage  = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }
    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return {
        totalPages,
        currentPage, 
        currentProducts, 
        startItem,
        endItem,
        handlePreviousPage,
        handleNextPage,
        visiblePages,
        setCurrentPage
    };
}

export default usePagination
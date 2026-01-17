"use client"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { setCurrentPage } from "@/lib/slices/productsSlice"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const pageNumbers = []
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {currentPage > 2 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              dispatch(setCurrentPage(1))
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            1
          </Button>
          <span className="text-muted-foreground">...</span>
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => {
            dispatch(setCurrentPage(page))
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 1 && (
        <>
          <span className="text-muted-foreground">...</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              dispatch(setCurrentPage(totalPages))
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

"use client"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { filterByCategory } from "@/lib/slices/productsSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleCategoryChange = (category: string | null) => {
    dispatch(filterByCategory(category))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => handleCategoryChange(null)}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="w-full justify-start capitalize"
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

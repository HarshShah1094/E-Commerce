"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { setLoading, setProducts, setError } from "@/lib/slices/productsSlice"
import ProductGrid from "./product-grid"
import CategoryFilter from "./category-filter"
import Pagination from "./pagination"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader } from "lucide-react"

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { filteredProducts, categories, loading, error, selectedCategory, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products,
  )

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100")
        const data = await response.json()
        dispatch(setProducts(data.products))
      } catch (err) {
        dispatch(setError("Failed to fetch products"))
      }
    }

    fetchProducts()
  }, [dispatch])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop Our Products</h1>
          <p className="text-muted-foreground">Discover amazing products at great prices</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div>
            <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader className="w-8 h-8 animate-spin" />
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} />
                <div className="mt-8">
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card.jsx";
import { useGetProductsQuery } from "../product/productApi.js"
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { base } from "@/app/mainApi.js";
import { Badge } from "@/components/ui/badge.jsx";
import { useNavigate } from "react-router";

export default function Home() {

  const nav = useNavigate();
  const {data, isLoading, error} = useGetProductsQuery();
  

// Loading UI
  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500 text-lg">
        ❌ Failed to load products
      </div>
    );
  }

  return (
    <div className="py-5">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">🛍️ Products</h1>

       {data?.products.length === 0 && (
        <div className="flex items-center justify-center h-[60vh] text-red-500 text-lg">
          No products found
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products.map((product) => (
          <Card
            onClick={() => nav(`/product/${product._id}`)}
            key={product._id}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300 group cursor-pointer"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={`${base}/${product.image}`}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <CardContent className="p-4 space-y-2">
              {/* Title */}
              <h2 className="text-lg font-semibold line-clamp-1">
                {product.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>

              {/* Price + Stock */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-bold text-primary">
                  Rs. {product.price}
                </span>

                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Brand + Category */}
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{product.brand}</span>
                <span>{product.category}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>




    </div>
  )
}

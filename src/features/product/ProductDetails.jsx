import { useParams } from "react-router";
import { useGetProductQuery } from "./productApi.js"
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { base } from "@/app/mainApi.js";
import { Badge } from "@/components/ui/badge.jsx";
import AddToCart from "../carts/AddToCart.jsx";

export default function ProductDetails() {

    const {id} = useParams();
    const {data: product, isLoading, error} = useGetProductQuery(id);



     if (isLoading) {
    return (
      <div className="mx-auto p-6">
        <Card className="grid md:grid-cols-2 gap-6 p-6">

          {/* Image Skeleton */}
          <Skeleton className="w-full h-100 rounded-xl" />

          {/* Content Skeleton */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-[70%]" />
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[60%]" />

            <Skeleton className="h-20 w-full" />

            <Skeleton className="h-8 w-[30%]" />
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[30%]" />

            <Skeleton className="h-10 w-37.5" />
          </div>

        </Card>
      </div>
    );
  }

  if (error) return <p>{error.data}</p>



  return (
    <div className="mx-auto py-5">
      

      <Card className="grid md:grid-cols-2 gap-6">

        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={`${base}/${product.image}`}
            alt={product.title}
            className="rounded-xl w-full max-h-100 object-cover"
          />
        </div>

        {/* Product Info */}
        <CardContent className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex gap-2">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.brand}</Badge>
          </div>

          <p className="text-gray-600">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-green-600">
            Rs {product.price}
          </div>

          <div className="text-sm text-gray-500">
            Stock Available: {product.stock}
          </div>

          <div className="text-sm text-yellow-500">
            Rating: ⭐ {product.rating}
          </div>

          <AddToCart product={product} />

        </CardContent>
      </Card>

    </div>
  )
}

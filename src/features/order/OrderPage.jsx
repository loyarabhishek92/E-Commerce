import { useSelector } from "react-redux"
import { useGetOrdersQuery } from "./orderApi.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { base } from "@/app/mainApi.js";
import { Badge } from "@/components/ui/badge.jsx";
import { Separator } from "@/components/ui/separator.jsx";

export default function OrderPage() {

    const {user} = useSelector((state) => state.userSlice);
    const {isLoading, error, data: orders} = useGetOrdersQuery(user.token);

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>{error.data?.message}</p>
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      

      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders?.orders?.map((order) => (
        <Card key={order?._id} className="shadow-md">

          {/* Header */}
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`${base}/${order?.userId.image}`} />
                <AvatarFallback>
                  {order?.userId.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold">
                  {order?.userId.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order?.userId.email}
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Order ID
              </p>
              <p className="font-medium">
                {order?._id}
              </p>

              <Badge className="mt-2">Placed</Badge>
            </div>

          </CardHeader>

          <Separator />

          {/* Products */}
          <CardContent className="space-y-4">

            {order?.products?.map((item) => {
              const product = item.productId;
              return (
                <div
                  key={item._id}
                  className="flex gap-4 items-center border p-3 rounded-lg hover:shadow-sm transition"
                >

                  {/* Image */}
                  <img
                    src={`${base}/${product?.image}`}
                    className="w-20 h-20 object-cover rounded-md border"
                    alt={product?.title}
                  />

                  {/* Info */}
                  <div className="flex-1">

                    <h2 className="font-semibold">
                      {product?.title}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {product?.category} • {product?.brand}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-medium">
                      Rs {product?.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rs {product?.price * item.quantity}
                    </p>
                  </div>

                </div>
              );
            })}

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span>Rs {order?.totalAmount}</span>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-500 text-right">
              Ordered on:{" "}
              {new Date(order?.createdAt).toLocaleDateString()}
            </div>

          </CardContent>
        </Card>
      ))}


    </div>
  )
}

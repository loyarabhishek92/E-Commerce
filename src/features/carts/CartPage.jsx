import { Button } from "@/components/ui/button.jsx";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"
import { removeCart, setCart } from "./cartSlice.js";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { base } from "@/app/mainApi.js";
import { useNavigate } from "react-router";
import CheckOut from "./CheckOut.jsx";

export default function CartPage() {

    const {carts} = useSelector(state => state.cartSlice);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const total = carts.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleIncrement = (item) => {
      if(item.qty < item.stock) {
        dispatch(setCart({...item, qty: item.qty + 1}));
      }
    }

    const handleDecrement = (item) => {
      if(item.qty > 1) {
        dispatch(setCart({...item, qty: item.qty - 1}));
      }
    }


// ✅ EMPTY CART UI
    if (carts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">

        {/* Icon */}
        <div className="bg-gray-100 p-6 rounded-full mb-4 animate-pulse">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6 max-w-md">
          Looks like you haven’t added anything yet. Start shopping to fill your cart.
        </p>

        {/* CTA */}
        <Button
          onClick={() => nav("/")}
          className="px-6 py-2 text-base"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto py-5">
      

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">

          {carts.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition">

              <CardContent className="flex gap-4 items-center p-4">

                {/* Image */}
                <img
                  src={`${base}/${item.image}`}
                  className="w-24 h-24 object-cover rounded-md border"
                  alt={item.title}
                />

                {/* Info */}
                <div className="flex-1">

                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-muted-foreground">
                    Rs {item.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock: {item.stock}
                  </p>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-2 mt-3">

                    <Button
                      disabled={item.qty === 1}
                      onClick={() => handleDecrement(item)}
                      size="icon"
                      variant="outline"
                    >
                      <Minus />
                    </Button>

                    <span className="px-3 font-medium">
                      {item.qty}
                    </span>

                    <Button
                      disabled={item.qty === item.stock}
                      onClick={() => handleIncrement(item)}
                      size="icon"
                      variant="outline"
                    >
                      <Plus />
                    </Button>

                  </div>
                </div>

                {/* Remove */}
                <Button
                  onClick={() => dispatch(removeCart(item.id))}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 size={18} />
                </Button>

              </CardContent>
            </Card>
          ))}

        </div>

        {/* Order Summary */}
        <Card className="h-fit shadow-md">

          <CardContent className="p-6 space-y-4">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Rs {total}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            {/* Checkout */}
            <CheckOut cart={carts} total={total} />



          </CardContent>
        </Card>

      </div>

    </div>
  )
}

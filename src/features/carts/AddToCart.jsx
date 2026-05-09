import { Button } from "@/components/ui/button.jsx";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCart } from "./cartSlice.js";

export default function AddToCart({ product }) {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userSlice);
  const { carts } = useSelector(state => state.cartSlice);


  const isExist = carts.find(item => item.id === product._id);
  const [qty, setQty] = useState(isExist ? isExist.qty : 1);

  const handleCart = () => {
    dispatch(setCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock,
      qty
    }));
    
    nav('/cart');
  }



  return (
    <div className="mt-3 space-y-4">


      <div className="flex gap-5">

        <Button
          disabled={qty === 1}
          onClick={() => setQty(qty - 1)}
          variant="outline">
          <Minus />
        </Button>
        <h4>{qty}</h4>
        <Button
          onClick={() => setQty(qty + 1)}
          disabled={qty === product.stock}
          variant="outline">
          <Plus />
        </Button>

      </div>


      <Button
        onClick={handleCart}
        disabled={!user || user.role === 'admin'}
        className="bg-blue-500">Add to Cart</Button>

    </div>
  )
}

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../order/orderApi.js";
import { toast } from "sonner";
import { clearCart } from "./cartSlice.js";
import { Spinner } from "@/components/ui/spinner.jsx";

export default function CheckOut({cart, total}) {

  const {user} = useSelector((state) => state.userSlice);
  const [addOrder, {isLoading}] = useCreateOrderMutation();
  const dispatch = useDispatch();


  const handleOrder = async () => {
    try {
      await addOrder({
        token: user.token,
        data: {
          totalAmount: total,
          products: cart.map((item) => ({productId: item.id, quantity: item.qty})),
        }
      }).unwrap();
      dispatch(clearCart());
      toast.success('Order placed successfully');
    } catch (err) {
      toast.error(err?.data?.message);
    }
  }


  return (
    <div>
      

      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled = {isLoading} className="w-full">
          {isLoading ? <Spinner /> : "Checkout"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick= {handleOrder}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

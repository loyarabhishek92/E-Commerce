import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useSelector } from "react-redux";
import { useRemoveProductMutation } from "../product/productApi.js";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner.jsx";
import { TrashIcon } from "lucide-react";

export default function RemoveProduct({id}) {
    const { user } = useSelector(state => state.userSlice);
    const [deleteProduct, { isLoading }] = useRemoveProductMutation();

    const handleRemove = async () => {
        try {
            await deleteProduct({ id, token: user.token }).unwrap();
            toast.success('Product delete successfully');
        } catch (err) {
            toast.error(err.data.message);
        }
    }


    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                   <Button variant="outline">
                    {isLoading ? <Spinner /> : <TrashIcon className="text-red-800" />}
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
                        <AlertDialogAction onClick={handleRemove}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

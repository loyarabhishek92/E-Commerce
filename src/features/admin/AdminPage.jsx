import { Button } from "@/components/ui/button.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { EditIcon, MoreHorizontalIcon } from "lucide-react";
import { useGetProductsQuery } from "../product/productApi.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { base } from "@/app/mainApi.js";
import { useNavigate } from "react-router";
import RemoveProduct from "./RemoveProduct.jsx";

export default function AdminPage() {

    const { isLoading, error, data } = useGetProductsQuery();
    const nav = useNavigate();




    

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>{error.data}</h1>
    return (
        <div className="pt-10">
            <div className="flex justify-end">
                <Button onClick={() => nav('/form/add')} className= 'bg-blue-700'>Add product</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Edit</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>


                    {data.products.map(item => (
                        <TableRow key={item._id}>
                            <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage
                                        src={`${base}/${item.image}`}
                                        alt={item.fallback}
                                    />
                                    <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{item.title}</div>
                            </div>
                            </TableCell>
                            
                            <TableCell>Rs. {item.price}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.brand}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" onClick={() => nav(`/form/edit/${item._id}`)}>
                                    <EditIcon className="text-blue-800"/>
                                </Button>
                            </TableCell>
                            <TableCell className="text-right">
                                <RemoveProduct id={item._id}/>
                            </TableCell>
                        </TableRow>
                    ))}







                </TableBody>
            </Table>
        </div>
    )
}

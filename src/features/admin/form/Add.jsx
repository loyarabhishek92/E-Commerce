import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import { useAddProductMutation } from "@/features/product/productApi.js";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as Yup from 'yup';



export const categories = [
    'Electronics',
    'Clothing',
];

export const brands = [
    'Apple',
    'Puma'
];


const addSchema = Yup.object({
    title: Yup.string().min(4, 'Title must be at least 4 characters').max(40, 'Title must be at most 40 characters').required('Title is required'),
    description: Yup.string().min(4, 'Description must be at least 4 characters').max(500, 'Description must be at most 40 characters').required('Description is required'),
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
    brand: Yup.string().required('Brand is required'),
    stock: Yup.number().required('Stock is required'),
    image: Yup.mixed().test('file Type', 'Unsupported file', (val) => {
        return val && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type)
    }).required(),
});





export default function Add() {

    const { user } = useSelector(state => state.userSlice);
    const [addProduct, { isLoading }] = useAddProductMutation();
    const nav = useNavigate();


    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Add your product</CardTitle>
                    <CardDescription>
                        Enter product details below to add your product.
                    </CardDescription>
                </CardHeader>
                <CardContent>


                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            price: '',
                            category: '',
                            brand: '',
                            stock: '',
                            image: '',
                            imageReview: '',
                        }}

                        onSubmit={async (val) => {
                            const formData = new FormData();
                            formData.append('title', val.title);
                            formData.append('description', val.description);
                            formData.append('category', val.category);
                            formData.append('brand', val.brand);
                            formData.append('price', val.price); 
                            formData.append('stock', val.stock);
                            formData.append('image', val.image);

                            try {
                                await addProduct({
                                    body: formData,
                                    token: user.token,
                                }).unwrap();
                                toast.success("Product added successfully");
                                nav(-1);
                            } catch (err) {
                                toast.error(err.data.message);
                            }
                        }}

                        validationSchema={addSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            onChange={handleChange}
                                            value={values.title}
                                            name='title'
                                            id="title"
                                            type="text"
                                            placeholder="Title"
                                        />
                                        {errors.title && touched.title && <p className="text-destructive">{errors.title}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            onChange={handleChange}
                                            value={values.description}
                                            name='description'
                                            id="description"
                                            type="text"
                                            placeholder="Description"
                                        />
                                        {errors.description && touched.description && <p className="text-destructive">{errors.description}</p>}
                                    </div>


                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Category</Label>


                                        <Select onValueChange={(val) => {
                                            setFieldValue('category', val)
                                        }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>

                                                    {categories.map((category, index) => (

                                                        <SelectItem value={category} key={index}>{category}</SelectItem>
                                                    ))}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && touched.category && <p className="text-destructive">{errors.category}</p>}

                                    </div>


                                    <div className="grid gap-2">
                                        <Label htmlFor="brand">Brand</Label>

                                        <Select onValueChange={(val) => {
                                            setFieldValue('brand', val);
                                        }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Brands</SelectLabel>
                                                    {brands.map((brand, index) => (

                                                        <SelectItem value={brand} key={index}>{brand}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.brand && touched.brand && <p className="text-destructive">{errors.brand}</p>}

                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            onChange={handleChange}
                                            value={values.price}
                                            name="price"
                                            id="price"
                                            type="number"
                                            placeholder="Price"
                                        />
                                        {errors.price && touched.price && <p className="text-destructive">{errors.price}</p>}
                                    </div>





                                    <div className="grid gap-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            onChange={handleChange}
                                            value={values.stock}
                                            name="stock"
                                            id="stock"
                                            type="number"
                                            placeholder="Stock"
                                        />
                                        {errors.stock && touched.stock && <p className="text-destructive">{errors.stock}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Select Image</Label>
                                        <Input
                                            name="image"

                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                setFieldValue('imageReview', URL.createObjectURL(file));
                                                setFieldValue('image', file)
                                            }}
                                            type="file"
                                            placeholder="image"
                                        />
                                        {values.imageReview && !errors.image && <img src={values.imageReview} alt={values.fullname} />}

                                        {errors.image && touched.image && <p className="text-destructive">{errors.image}</p>}
                                    </div>



                                    <CardFooter className="flex-col gap-2">
                                        <Button
                                            disabled={isLoading} type="submit" className="w-full">
                                            {isLoading ? <Spinner /> : 'Add'}
                                        </Button>
                                    </CardFooter>
                                </div>


                            </form>
                        )}
                    </Formik>





                </CardContent>

            </Card>
        </div>
    )
}

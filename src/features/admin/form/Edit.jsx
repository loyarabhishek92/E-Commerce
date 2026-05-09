import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useGetProductQuery, useUpdateProductMutation } from "@/features/product/productApi.js";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import * as Yup from 'yup';
import { brands, categories } from "./Add.jsx";
import { base } from "@/app/mainApi.js";


const editSchema = Yup.object({
  title: Yup.string().min(4, 'Title must be at least 4 characters').max(40, 'Title must be at most 40 characters').required('Title is required'),
  description: Yup.string().min(4, 'Description must be at least 4 characters').max(500, 'Description must be at most 40 characters').required('Description is required'),
  price: Yup.number().required('Price is required'),
  category: Yup.string().required('Category is required'),
  brand: Yup.string().required('Brand is required'),
  stock: Yup.number().required('Stock is required'),
  image: Yup.mixed().test('file Type', 'Unsupported file', (val) => {
    if (!val) return true;
    return val && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type)
  }),
});


export default function Edit() {

  const { id } = useParams();
  const { isLoading, data, error } = useGetProductQuery(id);
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const { user } = useSelector(state => state.userSlice);
  const nav = useNavigate();

  if (isLoading) return <Spinner />
  if (error) return <p className="text-destructive">{error.data.message}</p>




  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Edit your products</CardTitle>
          <CardDescription>
            Enter product details below to edit your product.
          </CardDescription>
        </CardHeader>
        <CardContent>


          <Formik

            initialValues={{

              title: data.title,
              description: data.description,
              price: data.price,
              category: data.category,
              brand: data.brand,
              stock: data.stock,
              image: '',
              imageReview: data.image,


            }}
            onSubmit={async (val) => {
              const formData = new FormData();
              formData.append('title', val.title);
              formData.append('description', val.description);
              formData.append('price', val.price);
              formData.append('category', val.category);
              formData.append('brand', val.brand);
              formData.append('stock', val.stock);

              if (val.image) formData.append('image', val.image);
              try {
                await updateProduct({ id, body: formData, token: user.token }).unwrap();
                toast.success('Product updated successfully')
                nav(-1)

              } catch (err) {
                toast.error(err.data.message)
              }



            }}
            validationSchema={editSchema}

          >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      name='title'
                      onChange={handleChange}
                      value={values.title}
                      id="title"
                      type="text"
                    />
                    {errors.title && touched.title && <p className="text-destructive">{errors.title}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      name='description'
                      onChange={handleChange}
                      value={values.description}
                      id="description"
                      type="text"
                      placeholder="Description"
                    />
                    {errors.description && touched.description && <p className="text-destructive">{errors.description}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(val) => {
                        setFieldValue('category', val);
                      }}

                      value={values.category}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>

                          {categories.map((category, index) => (
                            <SelectItem key={index} value={category}>{category}</SelectItem>
                          ))}

                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {errors.category && touched.category && <p className="text-destructive">{errors.category}</p>}
                  </div>


                  <div className="grid gap-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select
                      onValueChange={(val) => {
                        setFieldValue('brand', val);
                      }}
                      value={values.brand}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select a Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Brands</SelectLabel>

                          {brands.map((brand, index) => (
                            <SelectItem key={index} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {errors.brand && touched.brand && <p className="text-destructive">{errors.brand}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      name='price'
                      onChange={handleChange}
                      value={values.price}
                      id="price"
                      type="number"
                      placeholder="Price"
                    />
                    {errors.price && touched.price && <p className="text-destructive">{errors.price}</p>}
                  </div>





                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      name='stock'
                      onChange={handleChange}
                      value={values.stock}
                      id="stock"
                      type="number"
                      placeholder="Stock"

                    />
                    {errors.stock && touched.stock && <p className="text-destructive">{errors.stock}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Select Image</Label>
                    <Input
                      name='image'
                      onChange={(e) => {
                        const file = e.target.files[0];



                        setFieldValue('imageReview', URL.createObjectURL(file));
                        setFieldValue('image', file);

                      }}

                      type="file"
                      placeholder="image"
                    />
                    {values.imageReview && !errors.image && <img src={values.image ? values.imageReview : `${base}/${values.imageReview}`} alt={values.fullname} />}

                    {errors.image && touched.image && <p className="text-destructive">{errors.image}</p>}
                  </div>



                  <CardFooter className="flex-col gap-2">
                    <Button disabled={updateLoading} type="submit" className="w-full">
                      {updateLoading ? <Spinner /> && <h1>Updating....</h1> : "Update"}
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

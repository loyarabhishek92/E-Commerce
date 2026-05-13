import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Formik } from "formik";

export default function SearchProduct({setSearchParams}) {
    return (
        <div>

            <Formik
            initialValues={{
                search: '',
            }}

            onSubmit={(val, {resetForm}) => {
                if(val.search.length > 0){
                    setSearchParams({search: val.search});
                }
                resetForm();
            }}
            >

                {({handleChange, handleSubmit, values}) => (
                    <form onSubmit={handleSubmit}>
                <div className="flex justify-center gap-5 mb-6 relative top-0">
                    <Input
                    onChange={handleChange}
                    value={values.search}
                    name='search'
                        className="w-md border-1 border-[rgba(255,165,0,0.5)]"
                        placeholder='Search Product'
                    />

                    <Button type="submit">Search</Button>
                </div>
            </form>
            )}
            </Formik>

            
        </div>
    )
}

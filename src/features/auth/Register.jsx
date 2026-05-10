import { Button } from "@/components/ui/button.jsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "./authApi.js";
import { Spinner } from "@/components/ui/spinner.jsx";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { registerValidator } from "@/lib/formValidator.js";

export default function Register() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  return (
    <div className="pt-2 flex justify-end">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your details below to register your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => nav('/login')}>Login</Button>
          </CardAction>
        </CardHeader>
        <CardContent>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              image: '',
            }}
            onSubmit={async (val, { resetForm }) => {

              const formDate = new FormData();
              formDate.append('username', val.username);
              formDate.append('image', val.image);
              formDate.append('email', val.email);
              formDate.append('password', val.password);

            
              try {
                await registerUser({body: formDate}).unwrap();
                toast.success('Registration successfully');
                nav(-1);
                resetForm();
              } catch (err) {
                toast.error('error');
              }
            }}

            validationSchema={registerValidator}

          >
            {({ handleChange, handleSubmit, values, touched, errors, setFieldValue }) => {
              return <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      onChange={handleChange}
                      value={values.username}
                      name='username'
                      id="username"
                      type="text"
                      placeholder="Mohan sapkota"
                    />
                    {errors.username && touched.username && <p className="text-red-500">{errors.username}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Select Image</Label>
                    <Input
                      name="image"

                      onChange={(e) => {
                        const file = e.target.files[0];

                        // setFieldValue('imageReview', URL.createObjectURL(file));
                        setFieldValue('image', file)
                      }}
                      type="file"
                      placeholder="image"
                    />

                    {errors.image && touched.image && <p className="text-destructive">{errors.image}</p>}
                  </div>


                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      onChange={handleChange}
                      value={values.email}
                      name='email'
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                    {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Input
                        onChange={handleChange}
                        value={values.password}
                        name='password'
                        id="password"
                        type={show ? 'text' : 'password'}
                        placeholder='password' />

                      <Button
                        type='button'
                        variant="ghost"
                        size="icon"
                        onClick={() => setShow(!show)}
                        className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                      >
                        {show ? <EyeIcon /> : <EyeOffIcon />}
                      </Button>
                    </div>
                    {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
                  </div>

                  <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                      {isLoading ? <Spinner /> : 'Register'}
                    </Button>
                  </CardFooter>
                </div>
              </form>
            }}
          </Formik>






        </CardContent>

      </Card>
    </div>
  )
}

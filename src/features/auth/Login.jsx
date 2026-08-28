import { Button } from "@/components/ui/button.jsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { loginValidator } from "@/lib/formValidator.js";
import { Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "./authApi.js";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice.js";

export default function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();



  return (
    <div className="pt-2 flex justify-end">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => nav('/register')}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>


          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (val, { resetForm }) => {
              try {
                const response = await loginUser(val).unwrap();
                dispatch(setUser(response));
                toast.success('Login successful');
                resetForm();
                nav('/');
              } catch (err) {
                toast.error(err.data.message)
              }

            }}

            validationSchema={loginValidator}

          >


            {({ handleChange, handleSubmit, errors, values, touched }) => (
              <form
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6">
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
                      />
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

                  <div className="grid gap-2">
                    <CardFooter className="flex-col gap-2">
                      <Button type="submit" className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? <Spinner /> : 'Login'}
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </form>
            )}



          </Formik>







        </CardContent>

      </Card>
    </div>
  )
}

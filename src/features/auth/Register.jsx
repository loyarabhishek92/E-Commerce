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

export default function Register() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const [registerUser, {isLoading}] = useRegisterMutation();
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
            password: ''
          }}
          onSubmit={async (val, {resetForm}) => {
            try {
              await registerUser(val).unwrap();
              toast.success('Registration successfully');
              nav(-1);
              resetForm();
            } catch (err) {
              toast.error(err.data.message);
            }
          }}
          >
            {({handleChange, handleSubmit, values, touched, errors}) => {
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
                      placeholder= 'password' />

                      <Button
                      type='button'
                      variant="ghost"
                      size="icon"
                      onClick = {() => setShow(!show)}
                      className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                      >
                        {show ? <EyeIcon /> : <EyeOffIcon />}
                      </Button>
                    </div>
                    
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

import { Button } from "@/components/ui/button.jsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useNavigate } from "react-router";

export default function Login() {
  const nav = useNavigate();
  return (
    <div className="pt-2 flex justify-end">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => nav('/register')}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" />
              </div>

              <div className="grid gap-2">
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </div>
            </div>
          </form>
        </CardContent>

      </Card>
    </div>
  )
}

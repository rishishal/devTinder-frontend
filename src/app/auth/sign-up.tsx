import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { useId } from "react";

export const SignUp = () => {
  const id = useId();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-semibold">Sign Up</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Name"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input
                  id={`${id}-email`}
                  placeholder="hi@yourcompany.com"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-password`}>Password</Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full">
            Sign up
          </Button>
          <p className="text-xs">
            Already have an account?{" "}
            <Link
              to="/authentication/sign-in"
              className="underline hover:text-blue-400"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

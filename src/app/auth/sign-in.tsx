import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { useApi } from "@/api";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const { useLogin, useFetchUser } = useApi();
  const loginMutation = useLogin();
  const fetchUserMutation = useFetchUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutation.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          fetchUserMutation.mutate(undefined, {
            onSuccess: () => navigate({ to: "/" }),
          });
        },
      },
    );
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-semibold">Sign In</CardTitle>

          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loginMutation.error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
              {(loginMutation.error as any)?.response?.data?.message ||
                "Login failed"}
            </div>
          )}
          <Form {...form}>
            <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                      <a
                        href="#"
                        className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            form="sign-in-form"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Login"}
          </Button>
          <p className="text-xs">
            Dont have account?{" "}
            <Link to="/sign-up">
              <span className="underline hover:text-blue-400">Sign Up</span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

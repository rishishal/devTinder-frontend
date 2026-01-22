import { Form, FormField } from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  Bio: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  skills: z.string().optional(),
});

export const ProfilePage = () => {
  const { auth } = useAuthStore();
  const { user } = auth;
  console.log(user);
  if (!user) {
    return <div>Loading...</div>;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.emailId || "",
      Bio: user?.bio || "",
      gender: (user?.gender as "Male" | "Female" | "Other") || undefined,
      skills: user?.skills?.join(", ") || "",
    },
  });
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
              <FormField control={form.control} />
            </form>
          </Form>
        </div>
      </div>
      <div>{/* User Live Card */}</div>
    </div>
  );
};

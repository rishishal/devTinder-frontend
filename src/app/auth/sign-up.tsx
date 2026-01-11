import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export const SignUp = () => {
  const id = useId();
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          LOGO
        </div>
      </div>

      <form className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input
              id={`${id}-name`}
              placeholder="Matt Welsh"
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
        <Button type="button" className="w-full">
          Sign up
        </Button>
      </form>
    </div>
  );
};

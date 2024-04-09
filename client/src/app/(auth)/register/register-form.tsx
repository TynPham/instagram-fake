"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  username: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export interface RegisterFormProps {}

export default function RegisterForm(props: RegisterFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} type="email" className="rounded-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} className="rounded-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} className="rounded-none" />
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
              <FormControl>
                <Input placeholder="Password" {...field} type="password" className="rounded-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="mt-4 text-center">
          People who use our service may have uploaded your contact information to Instagram. <span className="text-[#385185]">Learn More</span>
        </p>
        <p className="mt-4 text-center">
          By signing up, you agree to our <span className="text-[#385185]">Terms</span> , <span className="text-[#385185]">Privacy Policy</span> and{" "}
          <span className="text-[#385185]">Cookies Policy</span> .
        </p>
        <Button className="w-full mt-6">Sign up</Button>
      </form>
    </Form>
  );
}

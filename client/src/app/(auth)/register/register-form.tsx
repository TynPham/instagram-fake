"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterReqBodyType, registerReqBodySchema } from "@/schemaValidations/auth.schema";
import authApi from "@/apis/auth.api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { path } from "@/constants/path";

export interface RegisterFormProps {}

export default function RegisterForm(props: RegisterFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<RegisterReqBodyType>({
    resolver: zodResolver(registerReqBodySchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterReqBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const res = await authApi.register(values);
      await authApi.auth(res.payload.result);
      toast({
        description: res.payload.message,
      });
      router.push(path.home);
      router.refresh();
    } catch (error) {
      handleErrorApi(error, form.setError);
    }
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

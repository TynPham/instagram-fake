"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authApi from "@/apis/auth.api";
import { LoginReqBodyType, loginReqBodySchema } from "@/schemaValidations/auth.schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { path } from "@/constants/path";
import { handleErrorApi } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<LoginReqBodyType>({
    resolver: zodResolver(loginReqBodySchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginReqBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setIsLoading(true);
      const res = await authApi.login(values);
      await authApi.auth(res.payload.result);
      toast({
        description: res.payload.message,
      });
      router.push(path.home);
      router.refresh();
    } catch (error) {
      handleErrorApi(error, form.setError);
    } finally {
      setIsLoading(false);
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}

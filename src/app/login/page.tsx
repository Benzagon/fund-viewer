'use client';
import React from "react";
import { Button } from '../../components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from 'next/navigation'
 
const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1, { message: "Password must be at least 1 character long" })
})

export default function Login() {
    const router = useRouter()
    const searchParams = useSearchParams();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ""
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      
      const { email, password } = values;
      signIn("credentials", { email: email, password: password , callbackUrl: `${searchParams?.get('callbackUrl') || 'http://localhost:3000/'}`})
      //Display error if incorrect
     }

    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-[#FEFEFE] py-8 px-8 w-80 rounded grid drop-shadow-sm">
            <h2 className="text-xl font-semibold text-center">Login</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
  );
}
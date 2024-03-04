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
 
const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  fundId: z.string().min(1)
})

export default function Home() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
        fundId: ""
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      const { email, password, fundId } = values;
      const numberId = Number(fundId);
      try {
        fetch('/api/add-user', {
          method: 'POST', 
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password, numberId})
        });
      } catch (error){
        console.error(error);
      }

      console.log(values)
    }

    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-[#FEFEFE] py-8 px-8 w-80 rounded grid drop-shadow-sm">
            <h2 className="text-xl font-semibold text-center">Create user</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user email..." {...field} />
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
                    <Input type="text" placeholder="Enter user password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fundId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fund</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter fund Id..." {...field} />
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
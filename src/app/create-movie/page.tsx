'use client';
import React from "react";
import { Button } from '../../components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
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
  name: z.string().min(1),
  year: z.string().min(1)
})

export default function Home() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        year: ""
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      const { name, year } = values;
      try {
        fetch('/api/add-movie', {
          method: 'POST', 
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, year})
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
            <h2 className="text-xl font-semibold text-center">Create movie</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter movie name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter movie year..." {...field} />
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
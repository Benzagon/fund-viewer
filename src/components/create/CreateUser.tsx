'use client';
import React from "react";
import { Button } from '../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
 
const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
  usdInvested: z.string().min(1),
  tokens: z.string().min(1),
  tokenValEntry: z.string().min(1),
  btcPriceEntry: z.string().min(1),
  fundId: z.string().min(1),
  role: z.string(),
})

export default function CreateForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
        name: "",
        usdInvested: "",
        tokens: "",
        tokenValEntry: "",
        btcPriceEntry: "",
        role: "",
        fundId: ""
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      const { email, tokens, tokenValEntry, btcPriceEntry, usdInvested, name, password, fundId, role } = values;
      const numberId = Number(fundId);
      const numberTokens = Number(tokens);
      const numberTknVal = Number(tokenValEntry);
      const numberUsd = Number(usdInvested);
      const numberBtc = Number(btcPriceEntry);
      const user: User = {email, tokens: numberTokens, name, fundId: numberId, tokenValEntry: numberTknVal, usdInvested: numberUsd, btcPriceEntry: numberBtc, role: role};
      try {
        fetch('/api/add-user', {
          method: 'POST', 
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({user, password})
        });
      } catch (error){
        console.error(error);
      }

      console.log(values)
    }

    return (
      <div className="w-screen flex items-center justify-center bg-slate-100">
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter user name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter user role..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tokens</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter user tokens..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usdInvested"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USD Invested</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter user usd invested..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="btcPriceEntry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BTC Price @ Entry</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter btc price @ entry..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenValEntry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Val @ Entry</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter token val @ entry..." {...field} />
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
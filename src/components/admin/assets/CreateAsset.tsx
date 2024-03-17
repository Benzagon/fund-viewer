'use client';
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    amount: z.string().min(1, { message: "Amount cannot be empty" }),
    coin: z.string().regex(/^(BTC|ETH|USD)$/i, { message: "BTC, ETH or USD" }),
  })

export function CreateAsset({fundId}: {fundId: number}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: "",
            coin: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { name, amount, coin } = values;
        const numberValue = Number(amount);
        const formattedCoin = coin.toUpperCase(); 

        try {
          fetch('/api/add-user', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, formattedCoin, numberValue, fundId})
          });
        } catch (error){
          console.error(error);
        }
  
        console.log(values)
      }

return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline">New asset</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
            <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Create a new asset</h4>
                <p className="text-sm text-muted-foreground">
                Enter new asset data
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2"> 
                <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid grid-cols-3 items-center">
                            <Label htmlFor="name">Name</Label>
                            <FormControl>
                            <Input
                                id="name"
                                placeholder="Bitcoin"
                                className="col-span-2 h-8"
                                {...field}
                            />
                            </FormControl>
                        </div>
                        <FormMessage></FormMessage>
                    </FormItem>
                    )}
                />
                <FormField 
                control={form.control}
                name="coin"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid grid-cols-3 items-center">
                            <Label htmlFor="coin">Coin</Label>
                            <FormControl>
                            <Input
                                id="coin"
                                placeholder="BTC"
                                className="col-span-2 h-8"
                                {...field}
                            />
                            </FormControl>
                        </div>
                        <FormMessage></FormMessage>
                    </FormItem>
                    
                    )}
                />
                <FormField 
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid grid-cols-3 items-center">
                            <Label htmlFor="amount">Amount</Label>
                            <FormControl>
                            <Input
                                id="amount"
                                placeholder="20"
                                className="col-span-2 h-8"
                                {...field}
                            />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button variant={"default"} className="mt-2" type="submit">Submit</Button>
                </form>
            </Form>
            </div>
        </PopoverContent>
    </Popover>
)
}
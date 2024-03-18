'use client';
import revalidateAssets from "@/app/actions";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

interface Props {
    fundId: number,
    asset: Asset
}

const formSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    amount: z.string().min(1, { message: "Amount cannot be empty" }),
    coin: z.string().regex(/^(BTC|ETH|USD)$/i, { message: "BTC, ETH or USD" }),
  })

export function UpdateAsset({fundId, asset}: Props) {
    const [popoverState, setPopoverState] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: asset.name,
            amount: String(asset.value),
            coin: asset.coin,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { name, amount, coin } = values;
        const numberValue = Number(amount);
        const formattedCoin = coin.toUpperCase(); 
        const asset: Asset = {id: '', name, coin: formattedCoin, value: numberValue}

        try {
          fetch('/api/create-asset', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({asset, fundId})
          }).then(async () => {
            await revalidateAssets().then(() => setPopoverState(false));
          })
        } catch (error){
          console.error(error);
        }
      }

return (
    <Popover open={popoverState}>
        <PopoverTrigger asChild onClick={() => setPopoverState(true)}>
            <Button variant="outline">Update asset</Button>
        </PopoverTrigger>
        <PopoverContent onInteractOutside={() => setPopoverState(false)} className="w-72">
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="col-span-2 h-8">
                                        <SelectValue placeholder="Select a coin" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="BTC">BTC</SelectItem>
                                    <SelectItem value="ETH">ETH</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                </SelectContent>
                            </Select>
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
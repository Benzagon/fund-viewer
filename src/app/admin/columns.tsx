"use client";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeletePopup from "@/components/admin/assets/DeletePopup";
import { useState } from "react";
import { UpdateAsset } from "@/components/admin/assets/UpdateAsset";

export const columns: ColumnDef<Asset>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "coin",
        header: "Coin",
      },
      {
        accessorKey: "value",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("value"))
          const coin: string = row.getValue("coin");
          const formatted = amount + ' ' + coin;
          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          // eslint-disable-next-line
          const [openPopup, setOpenPopup] = useState(false);
          const usePopup = () => {
            setOpenPopup((open) => !open);
          }
          const asset = row.original
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>    
                    <UpdateAsset fundId={1} asset={asset}></UpdateAsset>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={() => usePopup()}
                  >    
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeletePopup open={openPopup} setOpenPopup={setOpenPopup} assetId={asset.id}></DeletePopup>
            </div>
          )
        },
      },
]
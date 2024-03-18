"use client";
import revalidateAssets from "@/app/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteAsset } from "@/lib/postAdmin";
import { Dispatch, SetStateAction } from "react";

const DeletePopup = ({open, setOpenPopup, assetId}: {open: boolean, setOpenPopup:Dispatch<SetStateAction<boolean>>, assetId: string}) => {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this asset?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the asset
                    and remove its data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenPopup(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                onClick={async () => {
                await deleteAsset(assetId).then(async () => {
                    await revalidateAssets().then(() => setOpenPopup(false));
                })}}
                >
                    Continue
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>           
    )
}

export default DeletePopup;
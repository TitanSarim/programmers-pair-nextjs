'use client'
import { ModeToggle } from "@/components/mode-toggles";
import { signIn, signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Delete, LogInIcon, LogOutIcon, Router, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
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
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function HeaderDropDown(){
    const session = useSession();
    const [open, setOpen] = useState(false);

    return(
        <>
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/* <AlertDialogTrigger asChild>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data associated with it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async() => { await deleteAccountAction(); setOpen(false); signOut({callbackUrl: '/'});}}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link">
                    {session.data ? (
                        <>
                            <Avatar className="mr-2">
                                <AvatarImage src={session.data.user.image ?? ""}/>
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                            {session.data?.user?.name}
                        </>
                    ) : (
                        <>Account</>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                {session.data ? (
                    <>
                    <DropdownMenuItem onClick={() =>  signOut({callbackUrl: '/'})}> <LogOutIcon className="mr-2"/> Sign Out</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {setOpen(true)}}><Trash className="mr-2"/> Delete Account</DropdownMenuItem>
                    </>
                ) : (
                    
                    <DropdownMenuItem onClick={() =>  signIn('google')}> <LogInIcon className="mr-2"/> Sign In</DropdownMenuItem>
                )}
                
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}


export function Header() {


    return(
        <header className="py-2 bg-gray-100 dark:bg-gray-900 w-full flex items-center justify-center">
            <div className="flex justify-between items-center w-[80%]">
                <Link href='/' className="flex gap-2 items-center text-xl ">
                    <Image src="/icons.jpeg" alt="icon" width="50" height="50" className="rounded-md"/>
                    QuietZone
                </Link>

                <div className="flex items-center gap-4">
                    <HeaderDropDown/>
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}
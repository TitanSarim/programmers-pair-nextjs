"use client";

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { createRoomAction } from './action'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(20).max(200),
    language: z.string().min(4).max(15),
    Linkedin: z.string().min(4).max(200),
    isPrivate: z.string().min(3).max(10),
    password: z.string().min(6).max(20).optional(),
}).refine(
    (data) => data.isPrivate !== "Private" || (data.isPrivate === "Private" && data.password),
    {
      message: "Password is required when the room is private",
      path: ["password"],
    }
);

export const privacy = [
    {"id": 1, name: "Private"},
    {"id": 2, name: "Public"}
]

const CreateRoomForm = () => {

    const [isPrivacy, setIsPrivacy] = useState<any>("Public")
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            language: "",
            Linkedin: "",
            isPrivate: "",
            password: "",
        },
    })

    const handlePrivacyChange = (value: string) => {
        setIsPrivacy(value)
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = {
            name: values.name,
            description: values.description,
            language: values.language,
            Linkedin: values.Linkedin,
            isPrivate: isPrivacy,
            password: values.password!
        }
        console.log(data)
        await createRoomAction(data)
        router.push("/")
    }

  return (
    
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input  {...field} />
                </FormControl>
                <FormDescription>
                    This is your room display name or Topic.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Input  {...field} />
                </FormControl>
                <FormDescription>
                    Description
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                    <Input  {...field} />
                </FormControl>
                <FormDescription>
                    Room language
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="Linkedin"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                    <Input  {...field} />
                </FormControl>
                <FormDescription>
                    Room language
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Privacy</FormLabel>
                <FormControl>
                    <Select onValueChange={handlePrivacyChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Public" />
                        </SelectTrigger>
                        <SelectContent>
                            {privacy.length > 0 && privacy.map((privacy: any) => (
                                <SelectItem key={privacy.id} value={privacy.name}>
                                    {privacy.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormDescription>
                    Is you room is private or public?
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />  

            {isPrivacy === "Private" && (
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input  {...field} type='password'/>
                    </FormControl>
                    <FormDescription>
                    Room password
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            )}

            

            <Button type="submit">Submit</Button>
        </form>
        </Form>
  )
}

export default CreateRoomForm
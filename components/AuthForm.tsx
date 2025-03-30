"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import FormField from "./FormField"
import { Link } from "lucide-react";
import { toast } from "sonner";
const AuthFormSchema = (type:FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(4).max(50),
    })
}
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const AuthForm = ({type}:{type:FormType}) => {
    const formSchema = AuthFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if(type === "sign-in"){
                console.log("Sign In", values)
                toast.success("Sign In Success")
            }else{
                toast.success("Sign Up Success")
                console.log("Sign Up", values)
            }

        }catch(e){
            console.log(e)
            toast.error("Something went wrong")
        }
      }
      const isSignIn = type === "sign-in"
      return (
    <div className="card-border lg:min-w-[500px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={32}
                    height={38}
                    />
                <h2 className="text-primary-100">InterVue AI</h2>
            </div>
            <h3>InterVue AI – Practice. Evaluate. Hire Smarter.</h3>
       
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && (
        <FormField control={form.control} name="name" label="Name" placeholder="Satyam Mishra" />)}
        <FormField control={form.control} name="Email" label="Your Email" placeholder="abc@gmail.com" />
        <FormField control={form.control} name="Password" label="Password" placeholder="x093i0ei" />
        <Button className="btn" type="submit">{isSignIn?'Log in your Account' :'Create an Account'}</Button> 
      </form>
    </Form>
    <p>
        {isSignIn ? (
          <span>Don't have an account? <a href="/sign-up" className="text-primary-100">Sign Up</a></span>
        ) : (
          <span>Already have an account? <a href="/sign-in" className="text-primary-100">Sign In</a></span>
        )}
        <Link href={!isSignIn? '/sign-in':'/sign-up'} className="text-primary-100">{!isSignIn? 'Sign-in' : 'Sign-up'}</Link>
    </p>
    </div>
    </div>
    );
}
export default AuthForm;
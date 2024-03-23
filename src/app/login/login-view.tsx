"use client";
import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserAuthForm } from "@/components/ui/user-auth-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (event: any) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Login successful");
    router.push("/");
  };

  function useWindowDimensions() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
      function updateDimensions() {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", updateDimensions);
      updateDimensions(); // Initial setup

      return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return dimensions;
  }
  const { width, height } = useWindowDimensions();

  return (
    // <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    //   <Toaster position="top-right" reverseOrder={false} />
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //       Log in to your account
    //     </h2>
    //   </div>

    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form className="space-y-6" onSubmit={handleLogin}>
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium leading-6 text-gray-900"
    //         >
    //           Email address
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="email"
    //             name="email"
    //             type="email"
    //             autoComplete="email"
    //             required
    //             className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium leading-6 text-gray-900"
    //         >
    //           Password
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             autoComplete="current-password"
    //             required
    //             className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type="submit"
    //           className="flex w-full justify-center rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brain"
    //         >
    //           Log in
    //         </button>
    //       </div>
    //     </form>

    //     <p className="flex justify-center  mt-10 text-center text-sm text-gray-500">
    //       Not a member?
    //       <Link legacyBehavior href="/sign-up">
    //         <a className="ml-4 font-semibold leading-6 text-brain hover:text-brain">
    //           Sign up now
    //         </a>
    //       </Link>
    //     </p>
    //   </div>
    // </div>
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={height}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              //{" "}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                // Log in to your account //{" "}
              </h2>
              //{" "}
            </div>
            //{" "}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              //{" "}
              <form className="space-y-6" onSubmit={handleLogin}>
                //{" "}
                <div>
                  //{" "}
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brain"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <p className="flex justify-center  mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link legacyBehavior href="/sign-up">
                  <a className="ml-4 font-semibold leading-6 text-brain hover:text-brain">
                    Sign up now
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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

import { useEffect, useState, useMemo } from "react";

import { Angkor } from "next/font/google";
const angkor = Angkor({ subsets: ["khmer"], weight: "400" });

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

  const texts = useMemo(
    () => [
      "Climb the leaderboard",
      "Ruin friendships",
      "Assemble your crew",
      "Bragging rights await.",
      "Track your achievements",
      "Unseat the reigning champ",
      "Gloat.",
    ],
    []
  ); // Empty dependency array to prevent re-creation of the array
  // State to hold the current text and its index
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      // Start deleting after a longer pause
      setTimeout(() => setReverse(true), 2000); // Hold the full sentence longer
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex(
          (prevSubIndex) => prevSubIndex + (reverse ? -prevSubIndex : 1)
        );
      },
      reverse ? 75 : 100
    ); // Faster typing speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

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
      <div className="container relative hidden h-full flex-col overflow-hidden items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Toaster position="top-right" reverseOrder={false} />
        <div
          className={`${angkor.className} absolute bottom-4  right-4 z-20 text-4xl flex items-center font-medium`}
        >
          Brain Buddies
        </div>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute w-full h-full inset-0 bg-zinc-900">
            <h1
              className={`${angkor.className} flex justify-center absolute w-full h-full text-center items-center  font-bold text-7xl`}
            >
              {`${texts[index].substring(0, subIndex)}`}
              <span className="blink-animation">|</span>
            </h1>
          </div>
          {/* <div
            className={`${angkor.className} relative z-20 text-6xl flex items-center font-medium`}
          >
            Brain Buddies
          </div> */}

          <div className="relative z-20 mt-auto"></div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm inline-block">
                      <a
                        href="#"
                        className="font-semibold text-brain hover:text-brain"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

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

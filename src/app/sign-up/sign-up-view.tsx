"use client";
import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BUCKET_URL } from "../utils/constants";

import { useEffect, useState, useMemo } from "react";

import { Angkor } from "next/font/google";
const angkor = Angkor({ subsets: ["khmer"], weight: "400" });

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const supabase = createClient();
  // some change to trigger a new build
  const handleSignUp = async (e: any) => {
    console.log(e);
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Sign up successful");
    const randomProfilePic =
      BUCKET_URL +
      `static/profile_pictures/default-${
        Math.floor(Math.random() * 4) + 1
      }.jpg`;
    const { data: trackData, error: trackError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data?.user?.id,
          created_at: data?.user?.created_at,
          email: data?.user?.email,
          profile_picture_url: randomProfilePic,
        },
      ]);
    if (trackError) {
      toast.error(trackError.message);
      return;
    }
    router.push("/profile");
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
    //       Sign up for an account
    //     </h2>
    //   </div>

    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form className="space-y-6" action="#" method="POST">
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
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //             className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <div className="flex items-center justify-between">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Password
    //           </label>
    //           <div className="text-sm">
    //             <a
    //               href="#"
    //               className="font-semibold text-brain hover:text-brain"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //         </div>
    //         <div className="mt-2">
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             autoComplete="current-password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //             className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type="submit"
    //           onClick={handleSignUp}
    //           className="flex w-full justify-center rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus:ring-brain focus:border-brain focus:border-3   focus-visible:outline-brain"
    //         >
    //           Sign up
    //         </button>
    //       </div>
    //     </form>

    //     <p className="mt-10 text-center text-sm text-gray-500">
    //       Have an account?
    //       <Link href="/login">
    //         <span className="ml-4 font-semibold leading-6 text-brain hover:text-brain">
    //           Log in
    //         </span>
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
              <form className="space-y-6" action="#" method="POST">
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
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
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
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSignUp}
                    className="flex w-full justify-center rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus:ring-brain focus:border-brain focus:border-3   focus-visible:outline-brain"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">
                Have an account?
                <Link href="/login">
                  <span className="ml-4 font-semibold leading-6 text-brain hover:text-brain">
                    Log in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

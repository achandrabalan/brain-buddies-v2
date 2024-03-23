"use client";
import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BUCKET_URL } from "../utils/constants";

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

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for an account
        </h2>
      </div>

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
              <div className="text-sm">
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
  );
}

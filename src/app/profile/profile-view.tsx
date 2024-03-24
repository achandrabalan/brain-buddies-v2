"use client";
import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { validFileTypes } from "../utils/constants";

interface Errors {
  username?: string;
  file?: string;
}
export default function Profile() {
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // fields
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fileName, setFileName] = useState("");

  const [fileProps, setFileProps] = useState<File>();
  const [errors, setErrors] = useState<Errors>();

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserID(user?.id || "");
      setUserEmail(user?.email || "");
    };
    fetchUser();
  }, []);

  // get existing profile from supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userID) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .single();
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      }
    };
    fetchProfile();
  }, [userID]);

  const handleFileUpload = (e: any) => {
    setFileProps(e.target.files[0]);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      toast.error("Error logging out");
      return;
    }
    toast.success("Logged out");
    router.push("/login");
  };

  const validateUsername = async (username: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username);

    if (error) {
      toast.error(error.message);
      return false;
    }
    if (data.length > 0) {
      if (data[0].id !== userID) {
        return true;
      }
    }
    return false;
  };

  const validateForm = async () => {
    const duplicateUsername = await validateUsername(username);
    const invalidFile =
      fileProps &&
      (fileProps?.size > 3145728 ||
        !validFileTypes.includes(fileProps?.type || ""));

    let errors = {} as Errors;
    if (!username) {
      errors.username = "username is required";
    } else if (duplicateUsername) {
      errors.username = "username is taken";
    }
    if (fileProps && fileProps.size > 3145728) {
      errors.file = "file size too large";
    } else if (fileProps && !validFileTypes.includes(fileProps.type || "")) {
      errors.file = "invalid file type";
    }
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors in the form");
      setErrors(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    validateForm().then(async (valid) => {
      if (valid) {
        const { data, error } = await supabase.from("profiles").upsert({
          id: userID,
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
        });
        if (error) {
          console.log(error);
          toast.error(error.message);
          return;
        }
        if (fileProps) {
          const filePath = `profile_pictures/${fileProps.name}-${userID}`;
          let { error } = await supabase.storage
            .from("static")
            .upload(filePath, fileProps);
          if (error) {
            toast.error("Failed to upload file");
            return;
          }
          const fileUrl = `https://hjeelebymhttxomgqoto.supabase.co/storage/v1/object/public/static/${filePath}`;
          const { data, error: updateError } = await supabase
            .from("profiles")
            .update({ profile_picture_url: fileUrl })
            .eq("id", userID);
          if (updateError) {
            toast.error(updateError.message);
            return;
          }
        }
        toast.success("Profile updated");
        setErrors({});
        router.push("/");
      }
    });
  };

  return (
    <>
      <form>
        <div className="flex flex-col space-y-12 items-center justify-center h-screen w-full ">
          <div className="border-b border-gray-900/10  mt-10">
            <h2 className="text-lg font-bold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful with
              what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="pl-2 block flex-1 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-brain focus:ring-brain focus:border-brain focus:border-3 "
                      placeholder="janerocks123"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {errors?.username && (
                  <span className="text-sm text-red-600">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="sm:col-span-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <span className="text-sm font-light "> optional </span>
                </div>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="first_name"
                      className="pl-2 block flex-1 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-brain focus:ring-brain focus:border-brain focus:border-3 "
                      placeholder="Jane"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <span className="text-sm font-light "> optional </span>
                </div>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="last_name"
                      className="pl-2 block flex-1 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-brain focus:ring-brain focus:border-brain focus:border-3 "
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cover_photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover Photo
                  </label>
                  <span className="text-sm font-light "> optional </span>
                </div>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-brain"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            handleFileUpload(e);
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, WEBP up to 3MB
                    </p>
                    {fileProps && (
                      <p className="text-xs pt-4 font-bold leading-5 text-gray-600">
                        {fileProps.name}
                      </p>
                    )}
                  </div>
                </div>
                {errors?.file && (
                  <span className="text-sm text-red-600">{errors?.file}</span>
                )}
              </div>
            </div>
            <div className="flex gap-x-3">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="flex w-full mt-10 justify-center hover:border-brain hover:border-[2px]  hover:bg-white hover:text-brain rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brain"
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  handleLogout(e);
                }}
                className="flex w-full mt-10 justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-brain hover:text-white hover:bg-brain shadow-sm focus-visible:outline focus-visible:outline-2 border-[2px] border-brain focus-visible:outline-brain"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

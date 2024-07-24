'use client'

import PhoneMockUp from "../svg/PhoneMockUp";
import { Input } from "../ui/input";
import { link } from "../link/LinkMain";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ProfileFormState,
  handleImageUpload,
  saveImage,
  updateProfile,
} from "@/actions/update-profile.action";
import Image from "next/image";
import IconImageUpload from "../svg/IconImageUpload";
import { User } from "@prisma/client";
import { FaSave } from "react-icons/fa";
import ToastMessage from "../toast/Toast";
import { deleteImage } from "@/actions/image-upload.action";
import SubmitButton from "../form/SubmitButton";

function ProfileMain({
  links,
  userProfile,
}: {
  links: link[];
  userProfile: User | null;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    userProfile?.image && userProfile.image !== "null"
      ? userProfile.image
      : null
  );
  const [firstName, setFirstName] = useState<string | null>(
    userProfile?.first_name && userProfile.first_name !== "null"
      ? userProfile.first_name
      : null
  );
  const [lastName, setLastName] = useState<string | null>(
    userProfile?.last_name && userProfile.last_name !== "null"
      ? userProfile.last_name
      : null
  );
  const [email, setEmail] = useState<string | null>(
    userProfile?.email ? userProfile.email : null
  );
  const [username, setUsername] = useState<string | null>(
    userProfile?.username && userProfile.username !== "null"
      ? userProfile.username
      : null
  );
  const [state, setState] = useState<ProfileFormState | null>(null);

  const [imgFile, setImgFile] = useState<string | null>(null);

  const [pending, setPending] = useState<boolean>(false);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      const res = await handleImageUpload(formData);
      if (res) {
        setImagePreview(res);
        setImgFile(res);
      }
    }
  };

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        setState(null);
      }, 3000);
    }
  }, [state]);
  return (
    <main className="flex-1 md:grid md:grid-cols-5 md:gap-4 p-4 bg-[#FAFAFA]/50">
      <section className="md:flex hidden md:col-span-2 items-start justify-center bg-white md:flex-1">
        <div className="mt-20">
          <PhoneMockUp links={links} color="" />
        </div>
      </section>
      <section className="flex-1 flex flex-col md:col-span-3 bg-white pt-10">
        <div className="pt-6 flex-1 flex flex-col">
          <h2 className="px-6 heading-m text-darkgrey">Profile Details</h2>
          <p className="px-6 body-m text-grey mt-2">
            {"Add your details to create a personal touch to your profile"}
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setPending(true);
              // Create a FormData object
              const formData = new FormData();
              formData.append("firstName", firstName ? firstName : "");
              formData.append("lastName", lastName ? lastName : "");
              formData.append("email", email ? email : "");
              formData.append("username", username ? username : "");
              if (imgFile) {
                if (userProfile?.image) {
                  const strArr = userProfile.image.split("/");
                  const imgKey = strArr[strArr.length - 1];
                  console.log(imgKey);
                  const res = await deleteImage(imgKey);
                }

                const response = await saveImage(imgFile);
              }

              const response = await updateProfile(formData);
              if(response) {
                setPending(false);
              }
              setState(response);
            }}
            className="flex flex-col flex-1 gap-4"
          >
            <div className="px-10">
              <div className="bg-[#fafafa] px-6 grid p-4 mt-8 grid-cols-1 sm:grid-cols-6 rounded-xl gap-2">
                <div className="text-grey flex items-center justify-start sm:col-span-2">
                  <p>Profile picture</p>
                </div>
                <div className="flex gap-2 sm:flex-row flex-col sm:col-span-4">
                  <label
                    className={`${
                      imagePreview ? "text-white fill-white " : ""
                    }bg-hover-foreground cursor-pointer relative w-[200px] h-[200px] rounded-xl gap-2 text-primary flex flex-col items-center justify-center`}
                  >
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {imagePreview && (
                      <>
                        <Image
                          width={200}
                          height={200}
                          src={imagePreview}
                          alt="Preview"
                          className="mb-4 max-w-xs absolute w-full h-full object-cover rounded-xl top-0"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
                      </>
                    )}
                    <IconImageUpload
                      className={
                        imagePreview ? "fill-[#fff] z-10" : "fill-[#633CFF]"
                      }
                    />
                    <p className="font-semibold z-10">+ Upload Image</p>
                  </label>

                  <div className="flex flex-col sm:items-center items-start justify-center text-grey body-s">
                    <p>Image must be below 1024x1024px</p>
                    <p>Use PNG or JPG format</p>
                  </div>
                </div>
              </div>
              <div className="grid px-6 grid-cols-1 gap-4 w-full bg-[#fafafa] p-4 mt-8 rounded-xl">
                <div className="sm:grid-cols-6 grid-cols-1 grid rounded-xl">
                  <div className="text-grey flex items-center justify-start col-span-2">
                    <label htmlFor="firstName" className="relative">
                      First Name{" "}
                      <span className="absolute -top-[2px] -right-[4px]">
                        *
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-2 col-span-4 relative">
                    {state?.errors.firstName && (
                      <div className="absolute bsolute top-[50%] bottom-[50%] -translate-y-[50%] pointer-events-none left-4 w-full h-full flex items-center">
                        <span
                          className="mr-6 body-s text-destructive ml-auto"
                          role="alert"
                        >
                          {state?.errors.firstName[0]}
                        </span>
                      </div>
                    )}
                    <Input
                      name="firstName"
                      className="border-border focus:border-none indent-2"
                      value={firstName ? firstName : undefined}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="firstName"
                      placeholder="e.g.John"
                    />
                  </div>
                </div>
                <div className="sm:grid-cols-6 grid-cols-1 grid rounded-xl">
                  <div className="text-grey flex items-center justify-start col-span-2">
                    <label htmlFor="lastName" className="relative">
                      Last Name{" "}
                      <span className="absolute -top-[2px] -right-[4px]">
                        *
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-2 col-span-4 relative">
                    {state?.errors.lastName && (
                      <div className="absolute bsolute top-[50%] bottom-[50%] -translate-y-[50%] pointer-events-none left-4 w-full h-full flex items-center">
                        <span
                          className="mr-6 body-s text-destructive ml-auto"
                          role="alert"
                        >
                          {state?.errors.lastName[0]}
                        </span>
                      </div>
                    )}
                    <Input
                      name="lastName"
                      className="border-border focus:border-none indent-2"
                      id="lastName"
                      placeholder="e.g.Doe"
                      value={lastName ? lastName : undefined}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:grid-cols-6 grid-cols-1 grid rounded-xl">
                  <div className="text-grey flex items-center justify-start col-span-2">
                    <label htmlFor="username" className="relative">
                      Username{" "}
                      <span className="absolute -top-[2px] -right-[4px]">
                        *
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-2 col-span-4 relative">
                    {state?.errors.username && (
                      <div className="absolute bsolute top-[50%] bottom-[50%] -translate-y-[50%] pointer-events-none left-4 w-full h-full flex items-center">
                        <span
                          className="mr-6 body-s text-destructive ml-auto"
                          role="alert"
                        >
                          {state?.errors.username[0]}
                        </span>
                      </div>
                    )}
                    <Input
                      name="username"
                      className="border-border focus:border-none indent-2"
                      id="username"
                      placeholder="e.g.Doe"
                      value={username ? username : undefined}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:grid-cols-6 grid-cols-1 grid rounded-xl">
                  <div className="text-grey flex items-center justify-start col-span-2">
                    <label htmlFor="email" className="relative">
                      Email{" "}
                      <span className="absolute -top-[2px] -right-[4px]">
                        *
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-2 col-span-4 relative">
                    {state?.errors.email && (
                      <div className="absolute bsolute top-[50%] bottom-[50%] -translate-y-[50%] pointer-events-none left-4 w-full h-full flex items-center">
                        <span
                          className="mr-6 body-s text-destructive ml-auto"
                          role="alert"
                        >
                          {state?.errors.email.join(" ,")}
                        </span>
                      </div>
                    )}
                    <Input
                      disabled
                      name="email"
                      className="border-border focus:border-none indent-2"
                      id="email"
                      placeholder="e.g.email@example.com"
                      value={email ? email : undefined}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex sm:mt-auto px-10 border-t flex-col justify-center py-4 sm:py-10">
              <SubmitButton
                className="w-full sm:w-auto sm:ml-auto sm:px-6 sm:h-10"
                label="Save"
                pendingLabel="Saving..."
                state={pending}
              />
            </div>
          </form>
        </div>
        {state?.success && (
          <ToastMessage
            icon={<FaSave className="w-6 h-6" />}
            message="Your changes have been successfully saved!"
          />
        )}
      </section>
    </main>
  );
}

export default ProfileMain;

"use client";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { link } from "@/components/link/LinkMain";

type FormInputProps = {
  label: string;
  linkId: number;
  type: string;
  wrapperClass: string;
  id: string;
  name: string;
  placeholder: string;
  className?: string;
  src: string;
  value: string;
  setNewLinks: React.Dispatch<React.SetStateAction<link[] | null>>;
  props?: React.ComponentPropsWithoutRef<"input">;
  error?: string;
};

function LinkForm({
  linkId,
  label,
  type,
  src,
  id,
  name,
  placeholder,
  wrapperClass,
  className,
  error,
  value,
  setNewLinks,
  props,
}: FormInputProps) {
  return (
    <div className={cn("", wrapperClass)}>
      <label htmlFor={id} className="body-s">
        {label}
      </label>
      <div className="relative">
        <Image
          alt="email icon"
          className="h-4 w-4 absolute top-[50%] bottom-[50%] -translate-y-[50%] left-4"
          src={src as string}
          width={32}
          height={32}
        />
        {error && (
          <div className="absolute bsolute top-[50%] bottom-[50%] -translate-y-[50%] pointer-events-none left-4 w-full h-full flex items-center">
            <span className="mr-6 body-s text-destructive ml-auto" role="alert">
              {error.split(",")[0]}
            </span>
          </div>
        )}
        <Input
          value={value}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(`${error ? "error-ring" : ""}`, className)}
          {...props}
          onChange={(e) => {
            setNewLinks((links) => {
              if (links) {
                const newlinks = links?.map((link) => {
                  if (link.id === linkId) {
                    return { ...link, url: e.target.value };
                  }
                  return link;
                });
                return newlinks;
              }

              return links;
            });
          }}
        />
      </div>
    </div>
  );
}

export default LinkForm;

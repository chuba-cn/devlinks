"use client";
import { register } from "@/actions/register.action";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";

import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";

function RegisterPage() {
  const [formState, action] = useFormState(register, { errors: {} });
  return (
    <main className="p-8 flex flex-col sm:items-center sm:justify-center flex-1 sm:bg-[#FAFAFA]">
      <Link href={"/"} className="py-8 flex sm:justify-center justify-start">
        <Image
          alt="devlink logo"
          src={"/assets/images/logo-devlinks-large.svg"}
          width={200}
          height={40}
          className="w-[182px] h-10"
        />
      </Link>
      <section className="max-w-[476px] sm:bg-white sm:p-8 sm:rounded-sm">
        <h1 className="heading-auth">Create account</h1>
        <p className="body-m text-grey mt-2">
          {"Let's get you started sharing your links!"}
        </p>
        <form action={action} className="mt-8">
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="e.g.alex@email.com"
            className="placeholder:text-darkgrey/50"
            wrapperClass="mt-4"
            src="/assets/images/icon-email.svg"
            label="Email"
            error={formState.errors.email && formState.errors.email[0]}
          />
          <FormInput
            wrapperClass="mt-4"
            src="/assets/images/icon-password.svg"
            label="Create password"
            placeholder="At least 8 characters"
            name="password"
            type="password"
            id="password"
            className="placeholder:text-darkgrey/50"
            error={formState.errors.password && formState.errors.password[0]}
          />
          <FormInput
            wrapperClass="mt-4"
            src="/assets/images/icon-password.svg"
            label="Confirm password"
            placeholder="At least 8 characters"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            className="placeholder:text-darkgrey/50"
            error={formState.errors.confirmPassword && formState.errors.confirmPassword[0]}
          />
          <p className="body-s text-darkgrey/50 my-4">
            Password must contain at least 8 characters
          </p>

          {formState.errors._form && (
            <p className="text-destructive body-s my-4">
              {formState.errors._form[0]}
            </p>
          )}
          <div className="flex mt-6">
            <SubmitButton
              className="w-full"
              label="Creat new account"
              pendingLabel="Creating an account..."
            />
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="body-m text-grey">Already have an account?</p>
          <Link href={"/login"} className="text-primary">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;

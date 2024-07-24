"use client";
import { handleLogin } from "@/actions/login.action";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";

function LoginPage() {
  const [formState, action] = useFormState(handleLogin, { errors: {} });

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
        <h1 className="heading-auth">Login</h1>
        <p className="body-m text-grey mt-2">
          Add you details below to get back into the app
        </p>
        <form action={action} className="mt-8">
          <FormInput
            error={formState.errors.email && formState.errors.email[0]}
            type="email"
            id="email"
            name="email"
            placeholder="e.g.alex@email.com"
            className="placeholder:text-darkgrey/50"
            wrapperClass="mt-4"
            src="/assets/images/icon-email.svg"
            label="Email"
          />
          <FormInput
            error={formState.errors.password && formState.errors.password[0]}
            wrapperClass="mt-4"
            src="/assets/images/icon-password.svg"
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            id="password"
            className="placeholder:text-darkgrey/50"
          />
          {formState.errors._form && (
            <div
              className="border mt-4 border-red-400 text-red-700 bg-red-200 py-2 px-4"
              role="alert"
            >
              {formState.errors._form[0]}
            </div>
          )}
          <div className="flex mt-6">
            <SubmitButton
              className="w-full"
              label="Login"
              pendingLabel="Logging in..."
            />
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="body-m text-grey">{"Don't have an account?"}</p>
          <Link href={"/register"} className="text-primary">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

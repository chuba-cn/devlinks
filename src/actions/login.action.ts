"use server"

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/sendEmail";
import { generateVerificationCode } from "@/lib/verification";
import { signInSchema } from "@/lib/zod";
import { getUserFromDb } from "@/queries/user";
import { loginFormState } from "@/types/form-states";
import { compare } from "bcryptjs";

export const handleLogin = async (
  formState: loginFormState,
  formData: FormData
): Promise<loginFormState> => {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    console.log(result.error.issues);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await getUserFromDb(result.data.email as string);

  if (!user) {
    return {
      errors: { _form: ["Login failed! No user found with these credentials"] },
    };
  }

  if (!user.emailVerified) {
    const token = await generateVerificationCode(user.email);

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/email-verification?token=${token}`;

    await sendVerificationEmail({ to: result.data.email, verificationUrl });

    return {
      errors: { _form: ["Login failed! Verify your email first. A verification code has been sent to your mailbox."] },
    };
  }

  const success = await compare(result.data.password as string, user.password);

  if (!success) {
    return {
      errors: {
        _form: ["Login failed! Invalid credentials"],
      },
    };
  }

  await signIn("credentials", {
    email: result.data.email,
    password: result.data.password,
    redirectTo: "/",
  });

  return { errors: {} };
};

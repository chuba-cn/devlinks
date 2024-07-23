import { db } from "@/db";
import { getVerificationTokenByToken } from "@/lib/verification";
import { verifyEmailResponse } from "@/types/response";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { token } = await request.json();

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    const res: verifyEmailResponse = { error: "Token does not exist" };

    return NextResponse.json(res, { status: 401 });
  }

  const hasExpired = new Date(existingToken.expires as Date) < new Date();

  if (hasExpired) {
    const res: verifyEmailResponse = { error: "Token expired" };

    return NextResponse.json(res, { status: 401 });
  }

  await db.user.update({
    where: {
      email: existingToken.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  const res: verifyEmailResponse = { success: "Email verified!" };

  return NextResponse.json(res, { status: 200 });
}

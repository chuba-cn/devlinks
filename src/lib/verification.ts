import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";

export const generateVerificationCode = async (
  identifier: string
): Promise<string> => {
  // Delete any existing verification token for the given identifier
  await db.verificationToken.deleteMany({
    where: {
      identifier,
    },
  });

  // Generate the verification code
  const token = uuidv4();

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); //Set verification code to expire 1 hour from the current time

  // Add the new verification token into the DB
  await db.verificationToken.create({
    data: {
      identifier,
      token,
      expires: expiresAt,
    },
  });

  // Return verification code
  return token;
};

export const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = db.verificationToken.findFirst({
    where: {
      token,
    },
  });

  return verificationToken;
};

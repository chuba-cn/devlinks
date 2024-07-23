import { db } from "@/db";

export const getUserFromDb = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findFirst({
    where: {
      username,
    },
  });

  return user;
};

import { db } from "@/db";
import { platform } from "@/lib/data";
import { getUserFromDb } from "./user";
import { auth } from "@/auth";

export const getLinks = async () => {
  const session = await auth();
  const user = await getUserFromDb(session?.user?.email as string);
  const links = await db.link.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      priority: "asc",
    },
  });

  let x = 35;
  let y = 278;

  const linkWithData = links.map((link) => {
    const linkData = {
      id: link.priority,
      linkId: link.id,
      platform: {
        name: link.platform,
        icon: platform.filter((p) => p.name === link.platform)[0].icon,
        priority: link.priority,
        egLink: platform.filter((p) => p.name === link.platform)[0].egLink,
        brandColor: platform.filter((p) => p.name === link.platform)[0]
          .brandColor,
        mockUpIcon: platform.filter((p) => p.name === link.platform)[0]
          .mockUpIcon,
        coordinates: { x, y },
      },
      url: link.url,
    };
    y = y + 64;
    return linkData;
  });

  return linkWithData;
};

export const getLinksByUsername = async (username: string) => {
  const user = await db.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }
  const links = await db.link.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      priority: "asc",
    },
  });

  let x = 35;
  let y = 278;

  const linkWithData = links.map((link) => {
    const linkData = {
      id: link.priority,
      linkId: link.id,
      platform: {
        name: link.platform,
        icon: platform.filter((p) => p.name === link.platform)[0].icon,
        priority: link.priority,
        egLink: platform.filter((p) => p.name === link.platform)[0].egLink,
        brandColor: platform.filter((p) => p.name === link.platform)[0]
          .brandColor,
        mockUpIcon: platform.filter((p) => p.name === link.platform)[0]
          .mockUpIcon,
        coordinates: { x, y },
      },
      url: link.url,
    };
    y = y + 64;
    return linkData;
  });
  console.log(linkWithData);

  return linkWithData;
};

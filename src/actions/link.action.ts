"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { getId, saveLinksSchema } from "@/lib/zod";
import { structureType, structureTypeArray } from "@/types/response";
import { revalidatePath } from "next/cache";

export const saveLinks = async (
  formData: FormData
): Promise<{ errors: structureTypeArray | {}[] }> => {
  const { result, errors } = saveLinksSchema(formData);

  if (!result.success) {
    return { errors: errors };
  }

  const data = getStructuredData(result.data);

  const session = await auth();

  if (!session) return { errors: [{}] };

  const user = await db.user.findFirst({
    where: {
      email: session.user?.email as string,
    },
  });
  try {
    await Promise.all(
      data.map(async (row) => {
        const key = parseInt(Object.keys(row)[0]);
        const platform = row[key].platform as string;

        // Ensure valid user object
        if (!user || !user.id) {
          throw new Error("User is not defined or user ID is missing");
        }

        const userId = user.id as string;
        const existingLink = await db.link.findFirst({
          where: {
            userId,
            platform,
          },
        });

        console.log(existingLink, platform, "getting existing link");

        if (!existingLink) {
          console.log("writing new link into db", platform);
          const data = await db.link.create({
            data: {
              userId,
              platform,
              url: row[key].link as string,
              priority: parseInt(row[key].priority as string),
            },
          });

          console.log(data);
          return { errors: [{}] };
        }

        await db.link.update({
          where: {
            id: existingLink.id as string,
          },
          data: {
            platform,
            url: row[key].link as string,
            priority: parseInt(row[key].priority as string),
          },
        });
      })
    );
  } catch (error) {
    console.log("Insert and update error", error);
  }

  revalidatePath("/links");
  return {
    errors: [{}],
  };
};

function getStructuredData(data: { [x: string]: string }) {
  const keys = Object.keys(data);
  let count: number = 1;
  let id: number;
  let row: structureType;
  let length = keys.length;

  const structuredData = keys.reduce((acc, key) => {
    //push the individual fields to the row object
    if (count === 1) {
      id = parseInt(getId(key));
      if (key.endsWith("url")) {
        row = {
          [id]: {
            link: data[key],
          },
        };
      } else if (key.endsWith("priority")) {
        row = {
          [id]: {
            priority: data[key],
          },
        };
      }
      {
        row = {
          [id]: {
            platform: data[key],
          },
        };
      }
    } else {
      id = parseInt(getId(key));
      if (key.endsWith("url")) {
        row = {
          ...row,
          [id]: {
            ...row[id],
            link: data[key],
          },
        };
      } else if (key.endsWith("priority")) {
        row = {
          ...row,
          [id]: {
            ...row[id],
            priority: data[key],
          },
        };
      } else {
        row = {
          ...row,
          [id]: {
            ...row[id],
            platform: data[key],
          },
        };
      }
    }

    if (count % 3 === 0) {
      const temp = row;
      //reset row array
      row = {};
      //reset count variable
      count = 1;
      //return acc with row
      return [...acc, temp];
    }

    count++;

    return [...acc];
  }, [] as structureTypeArray);

  return structuredData;
}

export const deleteLinks = async (trashItems: string[]) => {
  try {
    // Attempt deleting the links with IDs in the trashItems array
    await db.link.deleteMany({
      where: {
        id: {
          in: trashItems,
        },
      },
    });
    console.log(
      `Successfully deleted links with IDs: ${trashItems.join(", ")}`
    );
  } catch (error) {
    // Log any errors that may occur during deletion
    console.error("Error deleting links:", error);
  } finally {
    // Revalidate the path to ensure the UI reflects the delete action
    revalidatePath("/links");
  }
};

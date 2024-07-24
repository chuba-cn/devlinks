import IconArrowRight from "@/components/svg/IconArrowRight";
import { getLinksByUsername } from "@/queries/link";
import { getUserByUsername } from "@/queries/user";
import Image from "next/image";
import Link from "next/link";

async function ViewPage({ params }: { params: { username: string } }) {
  const username = params.username;
  const user = await getUserByUsername(username);
  const links = await getLinksByUsername(username);

  return (
    <>
      <div className="absolute hidden top-0 sm:block bg-primary w-screen h-[300px] rounded-b-3xl sm:px-4"></div>
      {user && (user.first_name && user.last_name && user.image) && links ? (
        <section className="flex flex-col gap-4 justify-center items-center mt-12 sm:rounded-2xl sm:top-40 sm:left-[50%] sm:right-[50%] sm:-translate-x-[50%] sm:w-fit sm:z-50 sm:bg-white sm:absolute sm:px-12 sm:py-12">
          <Image
            width={104}
            height={104}
            className="h-[104px] w-[104px] object-cover rounded-full border-4 border-primary"
            alt="profile photo"
            src={user?.image as string}
          />
          <h1 className="heading-m text-darkgrey text-nowrap">
            {user?.first_name + " " + user?.last_name}
          </h1>
          <p className="text-grey">{user?.email}</p>
          <div className="flex flex-col mt-8 gap-4">
            {links &&
              links.length > 5 &&
              links.slice(0, 5).map((link) => (
                <Link
                  href={link.url}
                  target="_blank"
                  key={link.id}
                  style={{ backgroundColor: link.platform.brandColor }}
                  className="relative flex items-center gap-2 min-w-[240px] text-white fill-white rounded-md px-4 py-4"
                >
                  {link.platform.icon}
                  <span className="ml-8">{link.platform.name}</span>
                  <IconArrowRight color="fill-white ml-auto" />
                </Link>
              ))}
            {links &&
              links.length <= 5 &&
              links.map((link) => (
                <Link
                  href={link.url}
                  target="_blank"
                  key={link.id}
                  style={{ backgroundColor: link.platform.brandColor }}
                  className="relative flex items-center gap-2 min-w-[240px] text-white fill-white rounded-md px-4 py-4"
                >
                  {link.platform.icon}
                  <span className="ml-8">{link.platform.name}</span>
                  <IconArrowRight color="fill-white ml-auto" />
                </Link>
              ))}
          </div>
        </section>
      ) : (
        <section className="flex items-center justify-center h-screen">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800">
                User Not Found
              </h1>
              <p className="mt-2 text-gray-600">
                Sorry, the user you&apos;re looking for does not exist.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/"
                className="block w-full py-3 px-4 text-center rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ViewPage;

import { getUserProfile } from "@/actions/update-profile.action";
import { auth } from "@/auth";
import ProfileMain from "@/components/profile/ProflieMain";
import { getLinks } from "@/queries/link";

async function ProfilePage() {
  const session = await auth();
  const userProfile = await getUserProfile(session?.user?.email as string);
  const links = await getLinks();

  return <ProfileMain links={links} userProfile={userProfile} />;
}

export default ProfilePage;

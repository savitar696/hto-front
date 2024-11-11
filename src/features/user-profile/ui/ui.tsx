import { ProfileHeader } from "./header";

export const UserProfile = ({ username }: { username: string }) => {
  return (
    <>
      <ProfileHeader username={username} />
    </>
  );
};

import { useAuthStore } from "@/stores/auth-store";

export const ProfilePage = () => {
  const { auth } = useAuthStore();
  const { user } = auth;
  console.log(user);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.emailId}</p>
    </div>
  );
};

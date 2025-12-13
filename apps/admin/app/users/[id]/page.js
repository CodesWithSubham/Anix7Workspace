
import { auth } from "@shared/auth";
import UserClientPage from "./user";

export default async function UserPage({ params }) {
  const id = (await params).id;

  const user = null; //await getUserById(id);

  if (!user)
    return (
      <div className="text-center text-5xl font-serif text-red-500">
        <strong>User Not Found!</strong>
      </div>
    );

  // Convert non-serializable fields to plain values

  delete user._id;
  delete user.__v;
  delete user.password;
  return <UserClientPage user={user} />;
}

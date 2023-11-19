import { UserButton } from "@clerk/remix";
import { createClerkClient } from "@clerk/remix/api.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { LoaderFunction, redirect } from "@remix-run/node";
 
export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  const user = await createClerkClient({secretKey: process.env.CLERK_SECRET_KEY}).users.getUser(userId);
  console.log(user)
  return user
}
 
export default function Index() {
  return (
    <div>
        <h1>Index route</h1>
        <p>You are signed in!</p>
        <UserButton afterSignOutUrl="/"/>
    </div>
  );
}
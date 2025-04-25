// app/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import ClientHome from "./ClientHome";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const user = await currentUser();

  return <ClientHome />;
}

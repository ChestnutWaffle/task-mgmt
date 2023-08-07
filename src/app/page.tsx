import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CreateModal from "../components/CreateModal";
import TasksList from "./TasksList";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? 1);

  if (page < 1) {
    redirect("/");
  }
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  if (!session.user.name) redirect("/create-username");

  return (
    <main className="p-8 flex-grow flex flex-col gap-12 justify-center items-center">
      <CreateModal />
      <TasksList skip={(page - 1) * 10} />
    </main>
  );
}

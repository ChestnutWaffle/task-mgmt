import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { db } from "@/lib/db";

export default async function CreateUserName() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");
  if (!!session.user.name) redirect("/");

  async function createUsername(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);

    if (!session) redirect("/api/auth/signin");

    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");

    if (!first_name || !last_name) {
      return;
    }

    await db.user.update({
      data: {
        name: `${first_name} ${last_name}`,
      },
      where: {
        id: session.user.id!,
      },
    });

    redirect("/");
  }

  return (
    <main className="flex-grow p-4 text-slate-200 flex justify-center items-center">
      <form
        action={createUsername}
        className="flex flex-col gap-4 p-4 bg-slate-700 rounded-lg my-12"
        style={{ colorScheme: "dark" }}
      >
        <div>
          <h1 className="text-lg font-semibold">Create Username</h1>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="w-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
            name="first_name"
            id="first_name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="w-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
            name="last_name"
            id="last_name"
          />
        </div>
        <SubmitButton
          btnClassName="w-full flex flex-row justify-center items-center gap-2 p-2 bg-blue-800 hover:bg-blue-700 rounded-lg  disabled:hover:bg-blue-600  shadow shadow-blue-800"
          btnText="Submit"
          icon={<></>}
        />
      </form>
    </main>
  );
}

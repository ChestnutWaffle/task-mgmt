"use server";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function taskCreate(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const title = formData.get("title");
  const description = formData.get("description");
  const deadline = formData.get("deadline");

  // console.log({ title, description, deadline });
  if (!title || !description || !deadline) {
    return;
  }

  // console.log({ title, description, deadline });

  await db.task.create({
    data: {
      title: title.toString(),
      description: description.toString(),
      deadline: new Date(deadline.toString()).toISOString(),
      userId: session.user?.id!,
    },
  });

  // console.log({ result });

  revalidatePath("/");
}

export async function taskEdit(
  taskUid: string,
  taskSlug: string,
  formData: FormData
) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  if (session.user.id !== taskUid) return;

  const title = formData.get("title");
  const deadline = formData.get("deadline");
  const description = formData.get("description");

  if (!taskSlug || !title || !deadline || !description) {
    return;
  }

  await db.task.update({
    data: {
      title: title.toString(),
      deadline: new Date(deadline.toString()).toISOString(),
      description: description.toString(),
      isCompleted: false,
      completedAt: null,
    },

    where: {
      slug: taskSlug,
    },
  });

  revalidatePath("/");
}

export async function taskDelete(
  taskUid: string,
  taskSlug: string,
  formData: FormData
) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  if (session.user.id !== taskUid) return;

  const confirmationString = formData.get("del_confirmation");

  if (!taskSlug || !confirmationString) {
    return;
  }

  if (confirmationString.toString().split("::")[1] !== taskSlug.toString())
    return;

  await db.task.delete({
    where: {
      slug: taskSlug.toString(),
    },
  });

  revalidatePath("/");
}

export async function taskComplete(taskSlug: string, taskUid: string) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  if (session.user.id !== taskUid) return;

  if (!taskSlug || !taskUid) {
    return;
  }

  await db.task.update({
    data: {
      isCompleted: true,
      completedAt: new Date().toISOString(),
    },
    where: {
      slug: taskSlug,
    },
  });

  revalidatePath("/");
}

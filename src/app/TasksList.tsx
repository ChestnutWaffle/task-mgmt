import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Task } from "@prisma/client";
import { DeleteModal } from "@/components/DeleteModal";
import { ArrowLeftIcon, CheckFillIcon, TrashIcon } from "@/components/icons";
import CompleteButton from "@/components/CompleteButton";
import { EditModal } from "@/components/EditModal";
import Link from "next/link";

interface Props {
  skip: number;
}

export default async function TasksList({ skip }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const tasks = await db.task.findMany({
    where: {
      userId: session.user.id!,
    },
    orderBy: {
      deadline: "asc",
    },
    take: 10,
    skip: skip,
  });

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center py-4">
        <Link
          href={skip / 10 === 2 ? "/" : `/?page=${skip / 10}`}
          className={`bg-blue-600 p-2 shadow shadow-blue-700 flex flex-row items-center rounded-lg gap-2 text-slate-200 ${
            skip / 10 === 0 && "pointer-events-none cursor-not-allowed"
          }`}
        >
          <ArrowLeftIcon className="w-5 h-5 " />
          Previous
        </Link>
        <Link
          href={`/?page=${skip / 10 + 2}`}
          className={`bg-blue-600 p-2 shadow shadow-blue-700 flex flex-row items-center rounded-lg gap-2 text-slate-200 ${
            (tasks.length === 0 || tasks.length < 10) &&
            "pointer-events-none cursor-not-allowed"
          }`}
        >
          Next
          <ArrowLeftIcon className="w-5 h-5 rotate-180" />
        </Link>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        {tasks.length === 0
          ? "No Tasks"
          : tasks.map((task) => {
              return <TaskItem key={task.slug} task={task} />;
            })}
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: Task }) {
  return (
    <div className="w-full flex flex-row gap-2 flex-wrap-reverse bg-slate-800  p-4 rounded-lg shadow-md shadow-slate-800">
      <div className="flex justify-center items-center p-2">
        {task.isCompleted ? (
          <div className="p-2 rounded-full">
            <CheckFillIcon className="w-10 h-10 text-green-700" />
          </div>
        ) : (
          <CompleteButton
            taskSlug={task.slug}
            taskUid={task.userId}
            taskTitle={task.title}
          />
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row justify-between">
          <h2
            className={`col-span-4 text-2xl font-semibold ${
              task.isCompleted && "line-through text-green-700"
            }`}
          >
            {task.title}
          </h2>

          <div className="flex flex-col">
            <p
              className={`text-right text-sm ${
                task.isCompleted && "line-through text-green-700"
              }`}
            >
              Deadline:{" "}
              {task.deadline.toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            {task.completedAt && (
              <p className="text-right">
                Completed:{" "}
                {task.completedAt.toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>
        <textarea
          className={`col-span-5 p-2 my-2 bg-slate-700 rounded-lg ${
            task.isCompleted && "line-through text-green-700"
          }`}
          disabled
          defaultValue={task.description}
        ></textarea>
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            Last Updated:{" "}
            {task.updatedAt.toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <div className="col-start-5 flex flex-row justify-end">
            <div className="flex items-center">
              <EditModal
                taskSlug={task.slug}
                taskTitle={task.title}
                taskUid={task.userId}
                taskDeadline={task.deadline}
                taskDescription={task.description}
              />
            </div>
            <div className="flex items-center">
              {task.isCompleted ? (
                <button disabled>
                  <TrashIcon className="w-6 h-6 text-green-700 line-through" />
                </button>
              ) : (
                <DeleteModal
                  taskSlug={task.slug}
                  taskTitle={task.title}
                  taskUid={task.userId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

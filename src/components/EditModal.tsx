"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import { EditIcon, RemoveIcon } from "./icons";
import SubmitButton from "./SubmitButton";
import { taskEdit } from "@/app/actions";
import { dateToDateInput } from "@/lib/utils";

interface Props {
  className?: string | undefined;
  taskTitle: string;
  taskDeadline: Date;
  taskDescription: string;
  taskSlug: string;
  taskUid: string;
}

export function EditModal({
  className = "",
  taskSlug,
  taskTitle,
  taskDeadline,
  taskDescription,
  taskUid,
}: Props) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [title, setTitle] = useState(taskTitle);
  const [deadline, setDeadline] = useState(taskDeadline);
  const [description, setDescription] = useState(taskDescription);

  async function submitForm(formData: FormData) {
    await taskEdit(taskUid, taskSlug, formData);
    closeModal();
  }

  return (
    <>
      <button className={className} onClick={openModal}>
        <EditIcon className="w-6 h-6" />
      </button>
      <Modal on={open}>
        <div className="flex flex-row-reverse">
          <button
            onClick={() => closeModal()}
            className="rounded-full hover:bg-slate-600/70 p-1"
          >
            <RemoveIcon className="w-6 h-6" />
          </button>
        </div>
        <form action={submitForm} className="flex flex-col gap-4 p-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              className="peer w-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="deadline">Deadline</label>
            <input
              className="peer w-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
              type="datetime-local"
              name="deadline"
              id="deadline"
              value={dateToDateInput(deadline)}
              onChange={(e) => setDeadline(new Date(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="peer w-full min-h-[100px] h-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
              name="description"
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.substring(0, 2500))
              }
            />
            <span className="text-xs text-slate-400">Limit: 2500 words</span>
          </div>
          <SubmitButton
            btnClassName="row-start-6 p-2 bg-blue-600 rounded-lg shadow shadow-blue-700"
            btnText="Confirm"
            icon={<></>}
          />
        </form>
      </Modal>
    </>
  );
}

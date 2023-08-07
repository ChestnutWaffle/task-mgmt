"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import { RemoveIcon, TrashIcon } from "./icons";
import SubmitButton from "./SubmitButton";
import { taskDelete } from "@/app/actions";

interface Props {
  className?: string | undefined;
  taskTitle: string;
  taskSlug: string;
  taskUid: string;
}

export function DeleteModal({
  className = "",
  taskSlug,
  taskTitle,
  taskUid,
}: Props) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  async function submitForm(formData: FormData) {
    await taskDelete(taskUid, taskSlug, formData);
    closeModal();
  }

  return (
    <>
      <button className={className} onClick={openModal}>
        <TrashIcon className="w-6 h-6" />
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
        <form action={submitForm} className="grid grid-rows-5 gap-2 p-2">
          <h3 className="text-lg font-medium">
            Are you sure you want to{" "}
            <span className="text-red-500">
              <code>Delete</code>
            </span>{" "}
            the Task?
          </h3>
          <div>
            <p>Title: {taskTitle}</p>
          </div>
          <div className="text-sm break-words">
            Type{" "}
            <code className="bg-slate-500 rounded-lg px-2 py-1">
              delete::{taskSlug}
            </code>
            <br />
            and hit Confirm to delete Task
          </div>

          <div>
            <label htmlFor={`del_confirmation-${taskSlug}`}></label>
            <input
              className="w-full bg-slate-600 rounded-lg p-2 focus:outline-none focus:outline-2 focus:outline-red-600 "
              type="text"
              name="del_confirmation"
              id={`del_confirmation-${taskSlug}`}
            />
          </div>
          <SubmitButton
            btnClassName="row-start-5  bg-red-600 rounded-lg shadow shadow-red-700"
            btnText="Confirm"
            icon={<></>}
          />
        </form>
      </Modal>
    </>
  );
}

"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { CheckOutlineIcon, LoadingIcon, RemoveIcon } from "./icons";
import { useState } from "react";
import Modal from "./Modal";
import { taskComplete } from "@/app/actions";
import SubmitButton from "./SubmitButton";

interface Props {
  taskSlug: string;
  taskUid: string;
  taskTitle: string;
}

export default function CompleteButton({
  taskSlug,
  taskUid,
  taskTitle,
}: Props) {
  // const { pending } = useFormStatus();

  // if (pending) {
  //   return (
  //     <div className="flex justify-center items-center p-2">
  //       <LoadingIcon className="w-10 h-10 animate-spin" />
  //     </div>
  //   );
  // }

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  async function submitForm(_: FormData) {
    await taskComplete(taskSlug, taskUid);
    closeModal();
  }

  return (
    <>
      <button
        type="submit"
        className="p-2 disabled:text-opacity-70 disabled:pointer-events-none hover:bg-slate-600 rounded-full active:text-green-700"
        onClick={openModal}
      >
        <CheckOutlineIcon className="w-10 h-10" />
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
        <form action={submitForm} className="grid grid-rows-3 gap-2 p-2">
          <h3 className="text-lg font-medium">
            Mark this Task as{" "}
            <span className="text-green-500">
              <code>Complete</code>
            </span>
          </h3>
          <div>
            <p>TaskId: {taskSlug}</p>
            <p>TaskTitle: {taskTitle}</p>
          </div>
          <SubmitButton
            btnClassName="row-start-3 p-2 bg-green-600 rounded-lg shadow shadow-green-700"
            btnText="Complete"
            icon={<></>}
          />
        </form>
      </Modal>
    </>
  );
}

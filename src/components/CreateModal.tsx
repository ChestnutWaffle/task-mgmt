"use client";
import { taskCreate } from "../app/actions";
import { AddIcon, RemoveIcon, TaskAddIcon } from "@/components/icons";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import Modal from "./Modal";
import { dateToDateInput } from "@/lib/utils";

export default function CreateModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  async function submitForm(formData: FormData) {
    const dateString = formData.get("deadline");

    if (!dateString) return;

    await taskCreate(dateString.toString(), formData);
    (document.getElementById("form") as HTMLFormElement).reset();
    closeModal();
  }

  return (
    <>
      <button
        onClick={openModal}
        className="w-full flex flex-row  justify-center items-center gap-4 p-8 bg-opacity-60 bg-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:backdrop-blur rounded-lg shadow-lg shadow-green-900/60"
      >
        <AddIcon className="w-12 h-12" />{" "}
        <span className="text-2xl">Create Task</span>
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
        <div className="w-full p-4 flex-grow bg-slate-700">
          <form id="form" className="flex flex-col gap-4" action={submitForm}>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                className="w-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
                type="text"
                name="title"
                id="title"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="deadline">Deadline</label>
              <input
                className="w-full bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
                type="datetime-local"
                name="deadline"
                id="deadline"
                min={dateToDateInput(new Date())}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-full h-28 bg-slate-600 rounded-lg focus:outline-none p-2 focus:outline-2 focus:outline-blue-500 "
                name="description"
                id="description"
                maxLength={2500}
                required
              />
              <span className="text-xs text-slate-400">Limit: 2500 words</span>
            </div>
            <SubmitButton
              btnClassName="flex flex-row justify-center items-center gap-2 p-2 bg-blue-800 hover:bg-blue-700 rounded-lg  disabled:hover:bg-blue-600  shadow shadow-blue-800"
              btnText="Create"
              icon={<TaskAddIcon className="w-6 h-6" />}
            />
          </form>
        </div>
      </Modal>
    </>
  );
}

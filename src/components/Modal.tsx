"use client";

import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  on: boolean;
}

export default function Modal({ on, children }: Props) {
  useEffect(() => {
    if (on) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [on]);

  if (!on) return <></>;

  return (
    <div
      id="modal"
      className="z-10 fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-slate-950/20 backdrop-blur flex justify-center items-center"
      tabIndex={0}
    >
      <div className="resize min-w-[250px] max-w-[700px] bg-slate-700 p-2 rounded-lg shadow-lg shadow-slate-900">
        {children}
      </div>
    </div>
  );
}

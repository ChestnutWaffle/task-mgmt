"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoadingIcon } from "./icons";

interface Props {
  icon: React.ReactNode;
  btnText: string;
  btnClassName: string;
}

export default function SubmitButton({ btnText, icon, btnClassName }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`disabled:text-opacity-70 disabled:pointer-events-none ${btnClassName}`}
      type="submit"
      disabled={pending}
    >
      <span className="flex flex-row gap-2 justify-center">
        {pending ? <LoadingIcon className="w-6 h-6 animate-spin" /> : icon}
        {btnText}
      </span>
    </button>
  );
}

import LoadingTask from "@/components/LoadingTask";
import { AddIcon } from "@/components/icons";

export default function LoadingPage() {
  return (
    <main className="p-8 flex-grow flex flex-col gap-12 justify-center items-center">
      <button
        className="w-full flex flex-row  justify-center items-center gap-4 cursor-not-allowed p-8 bg-opacity-60 bg-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:backdrop-blur rounded-lg shadow-lg shadow-green-900/60"
        disabled={true}
      >
        <AddIcon className="w-12 h-12" />{" "}
        <span className="text-2xl">Create Task</span>
      </button>
      <div className="w-full flex flex-col items-center gap-4">
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
      </div>
    </main>
  );
}

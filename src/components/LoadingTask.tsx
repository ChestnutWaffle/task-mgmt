export default function LoadingTask() {
  return (
    <div className="w-full flex flex-row gap-2 flex-wrap-reverse bg-slate-800  p-4 rounded-lg shadow-md shadow-slate-800">
      <div className="flex justify-center items-center p-2">
        <div className="p-2 ">
          <div className="w-10 h-10 rounded-full bg-slate-600 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex flex-row justify-between gap-2">
          <div className="col-span-4 min-w-[250px] flex-grow h-5 bg-slate-600 rounded animate-pulse"></div>

          <div className="flex flex-col w-48 rounded bg-slate-600 animate-pulse">
            <div className="text-right text-sm"></div>
            <div className="text-right"></div>
          </div>
        </div>
        <p className="col-span-5 h-10 bg-slate-600 rounded animate-pulse"></p>
        <div className="flex flex-row justify-between items-center">
          <p className="bg-slate-600 w-72 h-5 animate-pulse rounded"></p>
          <div className="col-start-5 flex flex-row justify-end gap-2">
            <div className="flex items-center p-3 bg-slate-600 rounded-full animate-pulse"></div>
            <div className="flex items-center p-3 bg-slate-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

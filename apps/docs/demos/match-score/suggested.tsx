import { MatchScore } from "@avero/react";

export default function MatchScoreSuggestedDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border border-gray-100 p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 truncate text-xs font-semibold text-gray-800 sm:text-sm">
            مبانی تحلیل داده
          </h4>
          <p className="text-2xs mb-2 truncate text-gray-500 sm:text-xs">علی کریمی</p>
          <span className="text-3xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-400">
            آنلاین
          </span>
        </div>
        <MatchScore value={8} />
      </div>
    </div>
  );
}

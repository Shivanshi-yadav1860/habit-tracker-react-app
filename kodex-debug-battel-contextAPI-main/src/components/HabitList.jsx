import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll, setShowAll } = useHabit();
  const today = new Date().toISOString().split("T")[0];

  // Guard FIRST
  if (habits.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Daily Progress placeholder */}
        <div className="m-4 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">
            Daily Progress
          </p>
          <p className="text-sm text-slate-400">Add habits to track your progress</p>
        </div>
        {/* Empty state */}
        <div className="flex-1 flex items-center justify-center px-4 pb-6">
          <div className="w-full max-w-md border border-slate-200 rounded-2xl py-12 px-6 text-center bg-white">
            <p className="font-semibold text-slate-600 text-base mb-1">No habits yet</p>
            <p className="text-sm text-slate-400">
              Start your journey by adding a new habit above.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;

  const progressPercent = Math.round((completedToday / habits.length) * 100);

  // Top category
  const topCategoryMap = habits.reduce((acc, h) => {
    if (h.category) acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});
  const catKeys = Object.keys(topCategoryMap);
  const mainFocus =
    catKeys.length > 0
      ? catKeys.reduce((a, b) =>
          topCategoryMap[a] >= topCategoryMap[b] ? a : b
        )
      : "—";

  // High priority count
  const highCount = habits.filter((h) => h.priority === "high").length;

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* ── Daily Progress Card ── */}
      <div className="m-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 shrink-0">
        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">
          Daily Progress
        </p>

        {/* Keep going row */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold text-slate-800">
            {completedToday === habits.length ? "Great job! 🎉" : "Keep going"}
          </p>
          <span className="text-base font-bold text-indigo-500">
            {completedToday} / {habits.length}
          </span>
        </div>

        {/* Progress line */}
        <div className="w-full h-px bg-slate-100 mb-4">
          <div
            className="h-px bg-indigo-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stats row */}
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Focus
            </p>
            <p className="text-sm font-bold text-indigo-500">{mainFocus}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Priority
            </p>
            <p className="text-sm font-bold text-indigo-500">
              {highCount} High Task{highCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* ── YOUR ROUTINE ── */}
      <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 shrink-0">
        Your Routine
      </p>

      <div className="px-4 pb-4 space-y-3">
        {visibleHabits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </div>

      {habits.length > 3 && (
        <div className="px-4 pb-4 shrink-0">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-xs font-semibold text-indigo-500 hover:text-indigo-700 py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            {showAll ? "Show less" : `Show all ${habits.length} habits`}
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitList;
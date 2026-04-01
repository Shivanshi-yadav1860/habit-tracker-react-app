import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const priorityTextColor = (p) => {
  if (p === "high") return "text-red-500";
  if (p === "medium") return "text-orange-400";
  return "text-green-500";
};

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: habit.name });

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);
  const streak = getStreak(habit.completedDates);

  const handleSave = () => {
    if (editData.name.trim()) {
      updateHabit(habit.id, { name: editData.name.trim() });
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-2xl border p-4 transition-all duration-200 ${
        isDoneToday
          ? "border-indigo-200 bg-indigo-50/30"
          : "border-slate-100 shadow-sm hover:shadow-md"
      }`}
    >
      {/* ── Top row: category + priority tags | streak ── */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
            {habit.category || "General"}
          </span>
          {habit.priority && (
            <span
              className={`text-[10px] font-bold uppercase tracking-widest ${priorityTextColor(habit.priority)}`}
            >
              {habit.priority}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base font-bold text-indigo-500 leading-none">
            {streak}{" "}
            <span className="text-[10px] font-bold text-indigo-400">^^</span>
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Streak
          </span>
        </div>
      </div>

      {/* ── Habit name / inline edit ── */}
      {editing ? (
        <input
          autoFocus
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="w-full font-bold text-slate-800 text-base bg-transparent border-b-2 border-indigo-400 focus:outline-none mb-2 pb-0.5"
        />
      ) : (
        <h3 className="font-bold text-slate-800 text-base mb-2">{habit.name}</h3>
      )}

      {/* ── Motivation pill ── */}
      {habit.motivation && (
        <div className="mb-3">
          <span className="inline-block text-xs text-slate-500 bg-slate-100 rounded-full px-3 py-0.5">
            {habit.motivation}
          </span>
        </div>
      )}

      {/* ── Goal label ── */}
      <div className="mb-3">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
          Goal:
        </p>
        <p className="text-sm font-semibold text-slate-700">
          {habit.goalValue} {habit.unit || "mins"}
        </p>
      </div>

      {/* ── Footer: Edit | Delete | Complete ── */}
      <div className="flex items-center justify-between">
        {!editing ? (
          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHabit(habit.id)}
              className="text-xs text-slate-500 hover:text-red-500 font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={handleSave}
            className="text-xs text-indigo-600 font-semibold"
          >
            Save
          </button>
        )}

        <button
          onClick={() => toggleHabit(habit.id)}
          className={`text-xs font-bold px-5 py-2 rounded-xl transition-colors ${
            isDoneToday
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isDoneToday ? "✓ Done" : "Complete"}
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
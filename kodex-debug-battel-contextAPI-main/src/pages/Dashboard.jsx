import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

const Dashboard = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-[#f7f7f2]">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-white flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <h1 className="text-sm font-bold text-slate-800 tracking-tight">
              Track Your Journey
            </h1>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 pb-4">
          <button className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm text-center hover:bg-slate-200 transition-colors">
            Dashboard
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Status card */}
        <div className="p-4">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Status
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              You're on a 5-day streak.{" "}
              <span className="text-indigo-500 font-semibold">Keep it going!</span>
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#f7f7f2] px-6 py-4 flex items-center shrink-0">
          <span className="text-xs font-semibold text-slate-600 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
            Goal: 75%
          </span>
        </header>

        {/* Content grid */}
        <div className="flex-1 grid grid-cols-3 gap-4 px-4 pb-4 overflow-hidden">
          {/* Active Habits panel — 2/3 */}
          <div className="col-span-2 bg-white rounded-2xl flex flex-col overflow-hidden shadow-sm">
            <div className="px-5 py-4 shrink-0">
              <h2 className="font-bold text-slate-700 text-sm">Active Habits</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <HabitList />
            </div>
          </div>

          {/* Add Habit panel — 1/3 */}
          <div className="bg-white rounded-2xl flex flex-col overflow-hidden shadow-sm">
            <div className="px-5 py-4 shrink-0">
              <h2 className="font-bold text-slate-700 text-sm">Add Habit</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              <HabitForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
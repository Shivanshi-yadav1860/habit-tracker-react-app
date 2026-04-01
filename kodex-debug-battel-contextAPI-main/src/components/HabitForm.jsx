import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      goalValue: 30,
      unit: "Minutes",
      startDate: new Date().toISOString().split("T")[0],
      category: "Mindset",
      priority: "medium",
    },
  });

  const onCommit = (values) => {
    addHabit({
      ...values,
      goalValue: Number(values.goalValue),
    });
    reset({
      name: "",
      goalValue: 30,
      unit: "Minutes",
      startDate: new Date().toISOString().split("T")[0],
      category: "Mindset",
      motivation: "",
      priority: "medium",
    });
  };

  const inputCls =
    "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-slate-300 text-slate-700";

  return (
    <form onSubmit={handleSubmit(onCommit)} className="flex flex-col gap-4">
      {/* Habit Name */}
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
          Habit Name
        </label>
        <input
          {...register("name", { required: true })}
          placeholder="e.g. Morning Exercise"
          className={inputCls}
        />
      </div>

      {/* Daily Goal + Unit */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
            Daily Goal
          </label>
          <input
            type="number"
            {...register("goalValue")}
            className={inputCls}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
            Unit
          </label>
          <select {...register("unit")} className={inputCls}>
            <option>Minutes</option>
            <option>Hours</option>
            <option>Times</option>
            <option>Pages</option>
            <option>Steps</option>
          </select>
        </div>
      </div>

      {/* Start Date + Category */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
            Start Date
          </label>
          <input type="date" {...register("startDate")} className={inputCls} />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
            Category
          </label>
          <select {...register("category")} className={inputCls}>
            <option>Mindset</option>
            <option>Fitness</option>
            <option>Learning</option>
            <option>Health</option>
            <option>Productivity</option>
            <option>Social</option>
          </select>
        </div>
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
          Motivation
        </label>
        <div className="relative">
          <textarea
            {...register("motivation")}
            placeholder="Why is this important to you?"
            rows={3}
            className={`${inputCls} resize-none pr-10`}
          />
          <span className="absolute bottom-2 right-2 text-base leading-none select-none">
            🌱
          </span>
        </div>
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
          Priority Level
        </label>
        <div className="flex gap-5 text-sm text-slate-600">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              value="low"
              {...register("priority")}
              className="accent-indigo-600"
            />
            Low
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              value="medium"
              {...register("priority")}
              className="accent-indigo-600"
            />
            Medium
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              value="high"
              {...register("priority")}
              className="accent-indigo-600"
            />
            High
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl text-sm transition-colors mt-1"
      >
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;
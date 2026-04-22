import { HeartPulse, Activity, Wheat, Dumbbell } from "lucide-react";
import { healthGoals, type RecipeHealthGoal } from "@/data/recipes";
import { useLanguage } from "@/lib/i18n";

interface HealthGoalsFilterProps {
  selected: RecipeHealthGoal[];
  onChange: (goals: RecipeHealthGoal[]) => void;
}

const goalIcons: Record<RecipeHealthGoal, typeof HeartPulse> = {
  "Heart Healthy": HeartPulse,
  "Diabetes Friendly": Activity,
  "High Fiber": Wheat,
  "Protein Rich": Dumbbell,
};

export function HealthGoalsFilter({ selected, onChange }: HealthGoalsFilterProps) {
  const { t, translateHealthGoal, translateHealthGoalDescription } = useLanguage();
  const toggleGoal = (goal: RecipeHealthGoal) => {
    if (selected.includes(goal)) {
      onChange(selected.filter((item) => item !== goal));
      return;
    }

    onChange([...selected, goal]);
  };

  return (
    <div className="brand-surface rounded-2xl border border-border p-5">
      <div className="mb-4 flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-base font-semibold">{t("health.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("health.subtitle")}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {healthGoals.map((goal) => {
          const Icon = goalIcons[goal.id];
          const isSelected = selected.includes(goal.id);

          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all active:scale-[0.97] sm:min-w-[220px] ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card hover:border-primary/35 hover:bg-secondary/40"
              }`}
              aria-pressed={isSelected}
            >
              <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold">
                <Icon className="h-4 w-4" />
                {translateHealthGoal(goal.id)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

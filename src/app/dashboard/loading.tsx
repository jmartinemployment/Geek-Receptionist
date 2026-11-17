import { ui } from "@/lib/ui";
import { CardSkeleton } from "./card-skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#0B162A] text-white">
    <div className={ui.page}>
      <h1 className={ui.h1}>Your receptionist</h1>
      <CardSkeleton label="your subscription" />
      <CardSkeleton label="your calendar" />
    </div>
    </div>
  );
}

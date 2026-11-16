import { ui } from "@/lib/ui";
import { CardSkeleton } from "./card-skeleton";

export default function DashboardLoading() {
  return (
    <main className={ui.page}>
      <h1 className={ui.h1}>Your receptionist</h1>
      <CardSkeleton label="your subscription" />
      <CardSkeleton label="your calendar" />
    </main>
  );
}

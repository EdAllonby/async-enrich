import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PageNav({ current }: { current: "users" | "developers" }) {
  return (
    <nav className="flex justify-center gap-2 mb-8">
      <Button
        variant={current === "users" ? "default" : "outline"}
        className={
          current === "users"
            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-600"
            : "bg-white/5 border-white/10 text-foreground hover:bg-white/10"
        }
        asChild
      >
        <Link href="/users">👥 All Users</Link>
      </Button>
      <Button
        variant={current === "developers" ? "default" : "outline"}
        className={
          current === "developers"
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600"
            : "bg-white/5 border-white/10 text-foreground hover:bg-white/10"
        }
        asChild
      >
        <Link href="/developers">💻 Developers</Link>
      </Button>
    </nav>
  );
}

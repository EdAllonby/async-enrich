import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PageNav({ current }: { current: "users" | "developers" }) {
  return (
    <nav className="flex justify-center gap-3 mb-12">
      <Button
        variant={current === "users" ? "default" : "outline"}
        className={
          current === "users"
            ? "bg-foreground text-background shadow-md hover:bg-foreground/90"
            : "bg-card border-border text-foreground hover:bg-muted"
        }
        asChild
      >
        <Link href="/users">👥 All Users</Link>
      </Button>
      <Button
        variant={current === "developers" ? "default" : "outline"}
        className={
          current === "developers"
            ? "bg-foreground text-background shadow-md hover:bg-foreground/90"
            : "bg-card border-border text-foreground hover:bg-muted"
        }
        asChild
      >
        <Link href="/developers">💻 Developers</Link>
      </Button>
    </nav>
  );
}

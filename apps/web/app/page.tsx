import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RandomUsersList, RandomUsersLoading } from "@/components/random-users";
import { ROLE_LIST } from "@/lib/roles";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-6 bg-linear-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-4 tracking-tight">
          Adorn
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
          A demo showcasing React Server Components with shared React Query
          cache across pages. Navigate between pages and watch the{" "}
          <span className="text-emerald-400">user details</span> persist!
        </p>
        <Badge
          variant="outline"
          className="bg-purple-500/15 border-purple-500/30 text-purple-400 px-4 py-2"
        >
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2" />
          RSC + TanStack Query Cache Sharing
        </Badge>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <Link href="/users">
          <Card className="group w-56 bg-white/5 border-white/10 py-6 transition-all hover:bg-indigo-500/10 hover:border-indigo-400/40 hover:shadow-[0_10px_40px_rgba(99,102,241,0.2)]">
            <CardContent className="p-0 flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">👥</span>
              <span className="text-lg font-semibold text-foreground">
                All Users
              </span>
              <span className="text-xs text-muted-foreground">
                Browse the full team directory with leadership section
              </span>
              <span className="text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                View directory →
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/developers">
          <Card className="group w-56 bg-white/5 border-white/10 py-6 transition-all hover:bg-emerald-500/10 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_rgba(16,185,129,0.2)]">
            <CardContent className="p-0 flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">💻</span>
              <span className="text-lg font-semibold text-foreground">
                Developers
              </span>
              <span className="text-xs text-muted-foreground">
                Frontend, Backend, Full Stack, and DevOps engineers
              </span>
              <span className="text-xs text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                View developers →
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto mb-10">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />
        <h2 className="text-xl font-bold text-foreground text-center mb-6">
          Browse by Role
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ROLE_LIST.map((role) => (
            <Link key={role.name} href={`/roles/${encodeURIComponent(role.name)}`}>
              <Card className="group bg-white/5 border-white/10 py-4 transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5">
                <CardContent className="p-0 flex flex-col items-center gap-2">
                  <span className="text-2xl">{role.emoji}</span>
                  <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
                    {role.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Featured Team Members
          </h2>
          <p className="text-muted-foreground text-sm">
            A random selection of 10 team members
          </p>
        </div>
        <Suspense fallback={<RandomUsersLoading />}>
          <RandomUsersList />
        </Suspense>
      </section>

      <div className="text-center mt-12 text-muted-foreground text-xs">
        <p>
          Navigate between pages to see the shared cache in action. User details
          persist across all role pages!
        </p>
      </div>
    </main>
  );
}

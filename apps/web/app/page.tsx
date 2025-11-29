import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RandomUsersList, RandomUsersLoading } from "@/components/random-users";
import { ROLE_LIST } from "@/lib/roles";

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-6 bg-background font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-foreground mb-6 tracking-tight">
            Adorn
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            A demo showcasing React Server Components with shared React Query
            cache across pages. Navigate between pages and watch the user details persist!
          </p>
          <Badge
            variant="outline"
            className="bg-muted/50 border-border text-foreground px-4 py-2"
          >
            RSC + TanStack Query Cache Sharing
          </Badge>
        </div>

        <div className="flex justify-center gap-6 mb-16">
          <Link href="/users">
            <Card className="group w-64 bg-card border border-border py-8 transition-all hover:shadow-lg hover:border-foreground/20">
              <CardContent className="p-0 flex flex-col items-center gap-4 text-center">
                <span className="text-5xl">👥</span>
                <span className="text-xl font-semibold text-foreground">
                  All Users
                </span>
                <span className="text-sm text-muted-foreground px-4">
                  Browse the full team directory with leadership section
                </span>
                <span className="text-sm text-foreground/70 font-medium group-hover:text-foreground transition-colors">
                  View directory →
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/developers">
            <Card className="group w-64 bg-card border border-border py-8 transition-all hover:shadow-lg hover:border-foreground/20">
              <CardContent className="p-0 flex flex-col items-center gap-4 text-center">
                <span className="text-5xl">💻</span>
                <span className="text-xl font-semibold text-foreground">
                  Developers
                </span>
                <span className="text-sm text-muted-foreground px-4">
                  Frontend, Backend, Full Stack, and DevOps engineers
                </span>
                <span className="text-sm text-foreground/70 font-medium group-hover:text-foreground transition-colors">
                  View developers →
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="h-px bg-border mb-10" />
          <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
            Browse by Role
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ROLE_LIST.map((role) => (
              <Link key={role.name} href={`/roles/${encodeURIComponent(role.name)}`}>
                <Card className="group bg-card border border-border py-5 transition-all hover:shadow-md hover:border-foreground/30">
                  <CardContent className="p-0 flex flex-col items-center gap-3">
                    <span className="text-3xl">{role.emoji}</span>
                    <span className="text-sm font-medium text-foreground text-center leading-tight">
                      {role.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="h-px bg-border" />
        </div>

        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-3">
              Featured Team Members
            </h2>
            <p className="text-muted-foreground">
              A random selection of 10 team members
            </p>
          </div>
          <Suspense fallback={<RandomUsersLoading />}>
            <RandomUsersList />
          </Suspense>
        </section>

        <div className="text-center mt-16 text-muted-foreground text-sm">
          <p>
            Navigate between pages to see the shared cache in action. User details
            persist across all role pages!
          </p>
        </div>
      </div>
    </main>
  );
}

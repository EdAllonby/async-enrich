import { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { RoleUsersList, RoleUsersLoading } from "./role-users-list";
import { getRoleConfig, formatRoleName } from "@/lib/roles";
import { notFound } from "next/navigation";

export default async function RolePage({
  params,
  searchParams,
}: {
  params: Promise<{ role: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { role: encodedRole } = await params;
  const role = decodeURIComponent(encodedRole);

  const config = getRoleConfig(role);
  if (!config) {
    notFound();
  }

  const displayRole = formatRoleName(role);

  return (
    <main className="min-h-screen py-16 px-6 bg-background font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            {config.emoji} {displayRole}s
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto mb-6 leading-relaxed">
            All team members with the {displayRole} role
          </p>
          <Badge
            variant="outline"
            className="bg-muted/50 border-border text-foreground px-4 py-2"
          >
            Shared React Query Cache
          </Badge>
        </div>

        <section>
          <Suspense fallback={<RoleUsersLoading />}>
            <RoleUsersList role={role} searchParams={searchParams} />
          </Suspense>
        </section>

        <div className="text-center mt-16 text-muted-foreground text-sm">
          <p>
            Data from{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded border border-border">
              /api/users/role/{encodeURIComponent(role)}
            </code>
          </p>
        </div>
      </div>
    </main>
  );
}

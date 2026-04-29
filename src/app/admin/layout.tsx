"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Layers,
  Plug,
  Settings,
  ExternalLink,
  LogOut,
  Cookie,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Lead", icon: Users },
  { href: "/admin/contenuti", label: "Contenuti", icon: FileText },
  { href: "/admin/use-cases", label: "Use Cases", icon: Layers },
  { href: "/admin/cookie-banner", label: "Cookie Banner", icon: Cookie },
  { href: "/admin/integrazioni", label: "Integrazioni", icon: Plug },
  { href: "/admin/impostazioni", label: "Impostazioni", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col bg-section-alt border-r border-border">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">A</span>
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm leading-tight">
                AgentForge
              </p>
              <p className="text-text-tertiary text-xs">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(href)
                  ? "bg-accent-blue/10 text-accent-blue font-medium"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-border space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            Torna al sito
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-accent-red hover:bg-accent-red/10 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Esci
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

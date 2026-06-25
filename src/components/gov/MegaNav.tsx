"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface NavItem {
  title: string;
  href?: string;
  items?: { title: string; href: string }[];
}

export function MegaNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="w-full bg-[#112a52] text-white/90 border-b border-[#0a1e3f] shadow-sm sticky top-[68px] z-40 hidden lg:block">
      <div className="flex items-center px-6">
        {items.map((item) => (
          <div key={item.title}>
            {item.items ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-3 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors outline-none",
                        mounted && item.items.some((subItem) => pathname?.startsWith(subItem.href)) &&
                          "bg-white/10 text-white border-b-2 border-gov-orange"
                      )}
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </button>
                  }
                />
                <DropdownMenuContent align="start" className="w-64 mt-0 rounded-none rounded-b-md shadow-lg border-t-0 border-[#0a1e3f] bg-white text-text p-2">
                  {item.items.map((subItem) => (
                    <Link key={`${subItem.title}-${subItem.href}`} href={subItem.href}>
                      <DropdownMenuItem
                        className={cn(
                          "cursor-pointer px-4 py-2.5 text-sm hover:bg-gov-blue-pale focus:bg-gov-blue-pale focus:text-gov-blue rounded-sm",
                          mounted && pathname === subItem.href && "bg-gov-blue-pale text-gov-blue font-semibold"
                        )}
                      >
                        {subItem.title}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors",
                  mounted && pathname === item.href && "bg-white/10 text-white border-b-2 border-gov-orange"
                )}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

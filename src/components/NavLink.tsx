"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ href, className, activeClassName, children, ...props }, ref) => {
  const pathname = usePathname() || '/';
  const active = pathname === href;
  return (
    <Link href={href} legacyBehavior>
      <a ref={ref} className={cn(className, active && activeClassName)} {...props}>
        {children}
      </a>
    </Link>
  );
});

NavLink.displayName = 'NavLink';

export { NavLink };

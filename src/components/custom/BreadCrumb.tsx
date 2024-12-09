"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BackButtonBreadcrumbProps {
  items: BreadcrumbItem[];
}

const ButtonBreadcrumb: React.FC<BackButtonBreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex container items-center space-x-4 px-5 xl:px-0 m-0 mx-auto max-w-7xl">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              <li>
                {index === items.length - 1 ? (
                  <span className="text-gray-800">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:underline"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default ButtonBreadcrumb;

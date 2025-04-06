import Link from "next/link";
import { clsx } from "clsx";

export const CardItem = ({
  href,
  title,
  description,
}: {
  href?: string;
  title: string;
  description: React.ReactNode;
}) => {
  const inner = (
    <div className={clsx(
      "p-4 transition",
      "bg-gray-100 dark:bg-gray-800",
      "hover:bg-gray-200 dark:hover:bg-gray-700"
    )}>
      <h2 className="font-semibold text-lg mb-1">{title}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
};

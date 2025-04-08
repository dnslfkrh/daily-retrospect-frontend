import clsx from "clsx";

const CardGroup = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="space-y-0">
      {children.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === children.length - 1;

        return (
          <div
            key={index}
            className={clsx(
              "p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 transition hover:bg-gray-200 dark:hover:bg-gray-700",
              {
                "rounded-t-2xl": isFirst && !isLast,
                "rounded-b-2xl": isLast && !isFirst,
                "rounded-2xl": isFirst && isLast,
                "border-t-0": !isFirst,
              }
            )}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default CardGroup;
export const CardGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 divide-y divide-gray-300 dark:divide-gray-700">
      {children}
    </div>
  );
};

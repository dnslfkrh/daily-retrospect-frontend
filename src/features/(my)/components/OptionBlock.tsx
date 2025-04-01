import Link from 'next/link';

interface BlockProps {
  title: string;
  link: string;
  emoji: string;
}

const OptionBlock = ({ title, link, emoji }: BlockProps) => {
  return (
    <div className="flex items-center p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <div className="mr-4 text-xl text-gray-800 dark:text-white">{emoji}</div>
      <Link href={link}>
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</span>
      </Link>
    </div>
  );
};

export default OptionBlock;
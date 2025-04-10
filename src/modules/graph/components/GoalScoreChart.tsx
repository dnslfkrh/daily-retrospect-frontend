"use client";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { GoalScoreChartProps } from "../types/goal-score-chart.type";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GoalScoreChart = ({ chartData }: GoalScoreChartProps) => {
  const { labels, data: numericScores } = chartData;
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const borderColor = isDarkMode ? "#FFFFFF" : "#374151";
  const backgroundColor = isDarkMode ? "rgba(250, 204, 21, 0.2)" : "rgba(55, 65, 81, 0.2)";
  const textColor = isDarkMode ? "#F3F4F6" : "#374151";

  const data = {
    labels,
    datasets: [
      {
        label: "평균 목표 점수",
        data: numericScores,
        borderColor,
        backgroundColor,
        tension: 0.2,
        pointRadius: numericScores.length > 30 ? 2 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: borderColor,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: textColor,
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(55, 65, 81, 0.2)",
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          color: textColor,
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(55, 65, 81, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg w-full">
      <div className="w-full h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GoalScoreChart;
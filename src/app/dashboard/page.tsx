import PracticePrompt from './components/practice-prompt';
import CategoryStats from './components/stats/category-stats';

export default function DashboardPage() {
  return (
    <div className="w-full grid md:grid-cols-4 px-4 gap-4">
      <div className="md:col-span-4 flex justify-center">
        <div className="w-[33%]">
          <PracticePrompt />
        </div>
      </div>
      <div className="col-span-2">
        <CategoryStats />
      </div>
    </div>
  );
}

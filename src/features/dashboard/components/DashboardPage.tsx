import { Button } from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import UserNav from "./UserNav";

function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          Cashflow
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>test</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

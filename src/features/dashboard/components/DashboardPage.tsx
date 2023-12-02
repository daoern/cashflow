import { Button } from "@/lib/shadcnUi";
import AppLayout from "../../../components/AppLayout";
import withAuth from "@/features/auth/hooks/withAuth";

function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>test</Button>
        </div>
      </div>

      {/* {Array.from({ length: 25 }, (v, k) => k + 1).map((val) => {
        return <p>{val}</p>;
      })} */}
    </AppLayout>
  );
}

export default withAuth(DashboardPage);

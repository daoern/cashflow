import { Button } from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <div>
      Dashboard<Button>Haha</Button>
      {t("welcome")}
    </div>
  );
}

export default Dashboard;

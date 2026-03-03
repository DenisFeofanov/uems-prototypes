import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { ExplorerPermissions } from "./components/ExplorerPermissions";
import FullScreenDialog from "./components/FullScreenDialog";
import type { SimplifiedPermissions, Permissions } from "./types";

const MOCK_PERMISSIONS: Permissions = {
  uid: "mock-user-001",
  name: "Иванов Иван Иванович",
  email: "ivanov@example.com",
  roles: ["user"],
  hostTrades: { view: true, create: true, update: false, delete: false },
  tradePosition: { view: true, create: false, update: false, delete: false },
  bidderTrades: { view: true, create: true, update: true, delete: false },
  tradeInvitations: { view: true, create: false, update: false, delete: false },
  order: { view: false, create: false, update: false, delete: false },
  searchCompanies: { view: true, create: false, update: false, delete: false },
  tools: { view: true, create: true, update: true, delete: true },
  apparatus: { view: true, create: false, update: false, delete: false },
  lotusSTHE: { view: false, create: false, update: false, delete: false },
  calculationTools: { view: false, create: false, update: false, delete: false },
  menuCalculationTools: { view: true, create: true, update: false, delete: false },
  variableComplexity: { view: false, create: false, update: false, delete: false },
  toolsEllipticalBottom: { view: false, create: false, update: false, delete: false },
  toolsShell: { view: false, create: false, update: false, delete: false },
  notificationAccess: {
    "host-trades-reoffer-deadline-passed": { enabled: true },
    "host-trades-offer-submitted": { enabled: true },
    "bidder-trades-winner-selected": { enabled: true },
  },
};

function deriveSimplifiedPermissions(p: Permissions): SimplifiedPermissions {
  const sectionKeys = [
    "hostTrades", "tradePosition", "bidderTrades", "tradeInvitations",
    "order", "searchCompanies", "tools", "apparatus", "lotusSTHE",
    "calculationTools", "menuCalculationTools", "variableComplexity",
    "toolsEllipticalBottom", "toolsShell",
  ] as const;

  const sections: Record<string, boolean> = {};
  for (const key of sectionKeys) {
    const obj = p[key];
    if (obj && typeof obj === "object") {
      sections[key] = Object.values(obj as unknown as Record<string, boolean>).some(Boolean);
    } else {
      sections[key] = false;
    }
  }

  return {
    uid: p.uid,
    name: p.name,
    email: p.email,
    roles: [...p.roles],
    sections,
    notificationAccess: p.notificationAccess ?? {},
  };
}

const MOCK_SIMPLIFIED = deriveSimplifiedPermissions(MOCK_PERMISSIONS);

function App() {
  const [snackbar, setSnackbar] = useState(false);

  const handleSave = (updated: SimplifiedPermissions) => {
    console.log("Saved permissions:", updated);
    setSnackbar(true);
  };

  return (
    <>
      <FullScreenDialog
        isOpen={true}
        onClose={() => {}}
        title={`Редактирование прав доступа - ${MOCK_SIMPLIFIED.name}`}
      >
        <ExplorerPermissions
          initialPermissions={MOCK_SIMPLIFIED}
          onSave={handleSave}
        />
      </FullScreenDialog>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar(false)} severity="success" variant="filled">
          Права сохранены (см. console.log)
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { ModalForPermissions } from "./components/ModalForPermissions";
import type { Permissions } from "./types";

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

function App() {
  const [snackbar, setSnackbar] = useState(false);

  const handleSave = (updatedPermissions: Permissions) => {
    console.log("Saved permissions:", updatedPermissions);
    setSnackbar(true);
  };

  return (
    <>
      <ModalForPermissions
        permissions={MOCK_PERMISSIONS}
        specialization="machineBuildingPlant"
        open={true}
        onClose={() => {}}
        onSave={handleSave}
      />

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

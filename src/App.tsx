import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const [specialization, setSpecialization] = useState("machineBuildingPlant");
  const [snackbar, setSnackbar] = useState(false);

  const handleSave = (updatedPermissions: Permissions) => {
    console.log("Saved permissions:", updatedPermissions);
    setSnackbar(true);
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        UEMS Prototypes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Демо модального окна редактирования прав доступа
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
        <FormControl sx={{ minWidth: 280 }}>
          <InputLabel>Специализация</InputLabel>
          <Select
            value={specialization}
            label="Специализация"
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <MenuItem value="machineBuildingPlant">Завод (machineBuildingPlant)</MenuItem>
            <MenuItem value="institute">Институт (institute)</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" size="large" onClick={() => setOpen(true)}>
          Открыть модалку прав доступа
        </Button>
      </Box>

      <ModalForPermissions
        permissions={MOCK_PERMISSIONS}
        specialization={specialization}
        open={open}
        onClose={() => setOpen(false)}
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
    </Container>
  );
}

export default App;

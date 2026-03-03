import type { TreeNode } from "../dataTree";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

interface SectionDetailProps {
  node: TreeNode;
  hasAccess: boolean;
  notificationSettings: Record<string, boolean>;
  onToggleAccess: (key: string, value: boolean) => void;
  onToggleNotification: (notifKey: string, value: boolean) => void;
  onToggleAllNotifications: (
    notifications: { key: string }[],
    value: boolean
  ) => void;
}

export const SectionDetail = ({
  node,
  hasAccess,
  notificationSettings,
  onToggleAccess,
  onToggleNotification,
  onToggleAllNotifications,
}: SectionDetailProps) => {
  const hasNotifications =
    node.notifications && node.notifications.length > 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {node.label}
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={hasAccess}
            onChange={(e) => onToggleAccess(node.key, e.target.checked)}
          />
        }
        label="Доступ к разделу"
        sx={{ mb: 2, display: "flex" }}
      />

      {hasNotifications && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Уведомления
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={node.notifications!.every(
                  (n) => notificationSettings[n.key]
                )}
                indeterminate={
                  node.notifications!.some(
                    (n) => notificationSettings[n.key]
                  ) &&
                  !node.notifications!.every(
                    (n) => notificationSettings[n.key]
                  )
                }
                onChange={(e) =>
                  onToggleAllNotifications(
                    node.notifications!,
                    e.target.checked
                  )
                }
                disabled={!hasAccess}
              />
            }
            label="Все уведомления"
            sx={{ mb: 0.5 }}
          />
          <Box
            sx={{
              ml: 4,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {node.notifications!.map((notif) => (
              <FormControlLabel
                key={notif.key}
                control={
                  <Checkbox
                    checked={notificationSettings[notif.key] || false}
                    onChange={(e) =>
                      onToggleNotification(notif.key, e.target.checked)
                    }
                    size="small"
                    disabled={!hasAccess}
                  />
                }
                label={notif.label}
              />
            ))}
          </Box>
        </Box>
      )}

    </Box>
  );
};

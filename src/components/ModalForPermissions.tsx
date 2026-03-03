import type { SimplifiedPermissions } from "../types";
import { DUMMY_FLAT_CONFIGS } from "../dataTree";
import type { FlatSectionConfig } from "../dataTree";
import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ModalForPermissions = ({
  permissions,
  onSave,
}: {
  permissions: SimplifiedPermissions;
  onSave: (updatedPermissions: SimplifiedPermissions) => void;
}) => {
  const [editedRoles, setEditedRoles] = useState<string[]>(permissions.roles);
  const [sectionAccess, setSectionAccess] = useState<Record<string, boolean>>(
    () => ({ ...permissions.sections })
  );
  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    DUMMY_FLAT_CONFIGS.forEach((config) => {
      config.notifications?.forEach((notif) => {
        initial[notif.key] =
          permissions.notificationAccess?.[notif.key]?.enabled ?? false;
      });
    });
    return initial;
  });

  useEffect(() => {
    setEditedRoles(permissions.roles);
    setSectionAccess({ ...permissions.sections });
    const updated: Record<string, boolean> = {};
    DUMMY_FLAT_CONFIGS.forEach((config) => {
      config.notifications?.forEach((notif) => {
        updated[notif.key] =
          permissions.notificationAccess?.[notif.key]?.enabled ?? false;
      });
    });
    setNotificationSettings(updated);
  }, [permissions]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRoles([event.target.value]);
  };

  const handleAccessToggle = (key: string, value: boolean, config: FlatSectionConfig) => {
    setSectionAccess((prev) => ({ ...prev, [key]: value }));
    if (config.notifications) {
      setNotificationSettings((prev) => {
        const updated = { ...prev };
        config.notifications!.forEach((notif) => {
          updated[notif.key] = value;
        });
        return updated;
      });
    }
  };

  const handleNotificationChange = (notifKey: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [notifKey]: value }));
  };

  const handleAllNotificationsChange = (
    notifications: { key: string }[],
    value: boolean
  ) => {
    setNotificationSettings((prev) => {
      const updated = { ...prev };
      notifications.forEach((notif) => {
        updated[notif.key] = value;
      });
      return updated;
    });
  };

  const handleSave = () => {
    const notificationAccess: Record<string, { enabled: boolean }> = {};
    Object.entries(notificationSettings).forEach(([key, enabled]) => {
      notificationAccess[key] = { enabled };
    });
    onSave({
      uid: permissions.uid,
      name: permissions.name,
      email: permissions.email,
      roles: editedRoles,
      sections: sectionAccess,
      notificationAccess,
    });
  };

  const handleCancel = () => {
    setEditedRoles(permissions.roles);
    setSectionAccess({ ...permissions.sections });
  };

  const currentRole = editedRoles[0] || "";

  if (!permissions) return null;

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ mb: 1 }}>
          Выберите роль пользователя
        </FormLabel>
        <RadioGroup value={currentRole} onChange={handleRoleChange} row>
          <FormControlLabel
            value="user"
            control={<Radio />}
            label="Обычный пользователь"
          />
          <FormControlLabel
            value="admin"
            control={<Radio />}
            label="Администратор"
          />
        </RadioGroup>
      </FormControl>

      <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                Раздел
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                Доступ
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "60%" }}>
                Уведомления
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DUMMY_FLAT_CONFIGS.map((config) => {
              const hasAccess = !!sectionAccess[config.key];

              return (
                <TableRow
                  key={config.key}
                  hover
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ verticalAlign: "top", pt: 2 }}
                  >
                    {config.label}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Box sx={{ py: 1 }}>
                      <Switch
                        checked={hasAccess}
                        onChange={(e) =>
                          handleAccessToggle(config.key, e.target.checked, config)
                        }
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {config.notifications && config.notifications.length > 0 ? (
                      <Box sx={{ py: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={config.notifications.every(
                                (n) => notificationSettings[n.key]
                              )}
                              indeterminate={
                                config.notifications.some(
                                  (n) => notificationSettings[n.key]
                                ) &&
                                !config.notifications.every(
                                  (n) => notificationSettings[n.key]
                                )
                              }
                              onChange={(e) =>
                                handleAllNotificationsChange(
                                  config.notifications!,
                                  e.target.checked
                                )
                              }
                              color="primary"
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
                          {config.notifications.map((notif) => (
                            <FormControlLabel
                              key={notif.key}
                              control={
                                <Checkbox
                                  checked={
                                    notificationSettings[notif.key] || false
                                  }
                                  onChange={(e) =>
                                    handleNotificationChange(
                                      notif.key,
                                      e.target.checked
                                    )
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
                    ) : (
                      <Box sx={{ py: 1, color: "text.disabled" }}>—</Box>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 2,
        }}
      >
        <Button onClick={handleCancel} color="secondary" variant="outlined">
          Отмена
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Сохранить изменения
        </Button>
      </Box>
    </>
  );
};

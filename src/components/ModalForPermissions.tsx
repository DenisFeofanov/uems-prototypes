import type { Permissions } from "../types";
import {
  PERMISSION_CONFIGS_FACTORY,
  PERMISSION_CONFIGS_INSTITUTE,
} from "../data";
import type { PermissionConfig } from "../data";
import React, { useEffect, useState } from "react";

import FullScreenDialog from "./FullScreenDialog";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Inline translation map (Russian)
const translations: Record<string, string> = {
  buttonView_1: "Просмотр",
  creation_1: "Создание",
  buttonEdit_1: "Редактирование",
  labelDeletion_1: "Удаление",
  section_1: "Раздел",
  accessRightsLabel_1: "Права доступа",
  notifications_column: "Уведомления",
  allRightsLabel_1: "Все права",
  selectUserRole_1: "Выберите роль пользователя",
  regularUser_1: "Обычный пользователь",
  administratorLabel_1: "Администратор",
  buttonEditAccessRights_1: "Редактирование прав доступа",
  cancel_1: "Отмена",
  buttonSaveChanges_1: "Сохранить изменения",
  notifications_allNotifications: "Все уведомления",
  // permissions.* keys
  "permissions.hostTrades": "Собственные закупки",
  "permissions.tradePosition": "Шаблоны позиций",
  "permissions.bidderTrades": "Участие в закупках",
  "permissions.tradeInvitations": "Приглашения на закупку",
  "permissions.order": "Заказ-наряды",
  "permissions.searchCompanies": "Поиск компаний",
  "permissions.tools": "Инструменты",
  "permissions.apparatus": "Реестр аппаратов",
  "permissions.lotusSTHE": "LOTUS STHE",
  "permissions.calculationTools": "Трудоемкости аппарата",
  "permissions.menuCalculationTools": "Меню трудоемкости",
  "permissions.variableComplexity": "Переменные трудоемкости",
  "permissions.project": "Проекты",
  "permissions.projectLotusSTHE": "Проекты: LOTUS STHE",
  "permissions.toolsEllipticalBottom": "Днище (эллиптическое)",
  "permissions.toolsShell": "Обечайка",
  // notification labels
  notifications_hostTradesReofferDeadlinePassed: "Истёк срок переоферты",
  notifications_hostTradesNewTradeQuestion: "Новый вопрос по закупке",
  notifications_hostTradesDealReofferExpired: "Переоферта по сделке истекла",
  notifications_hostTradesDealReofferAccepted: "Переоферта по сделке принята",
  notifications_hostTradesOfferSubmitted: "Предложение подано",
  notifications_bidderTradesRegisteredCompanyInvitation: "Приглашение зарег. компании",
  notifications_bidderTradesNonRegisteredCompanyInvitation: "Приглашение незарег. компании",
  notifications_bidderTradesOfferCollectionCompleted: "Сбор предложений завершён",
  notifications_bidderTradesReofferRequested: "Запрошена переоферта",
  notifications_bidderTradesReofferDeadlinePassed: "Истёк срок переоферты",
  notifications_bidderTradesWinnerSelected: "Победитель выбран",
  notifications_bidderTradesOfferCollectionDeadlineExtended: "Срок сбора предложений продлён",
  notifications_bidderTradesQuestionAnswered: "Ответ на вопрос",
  notifications_bidderTradesDealReofferReceived: "Получена переоферта по сделке",
  notifications_bidderTradesDealReofferExpired: "Переоферта по сделке истекла",
  notifications_bidderTradesDealReofferAccepted: "Переоферта по сделке принята",
};

const t = (key: string): string => translations[key] || key;

// Safe permission object helper
const getSafePermissionObject = (
  obj: any,
  availablePermissions: string[]
): Record<string, boolean> => {
  const result: Record<string, boolean> = {};
  availablePermissions.forEach((permission) => {
    result[permission] = !!obj?.[permission];
  });
  return result;
};

const initializePermissions = (
  perms: Permissions,
  configs: PermissionConfig[]
): Permissions => {
  if (!perms) return perms;
  const initialized: Permissions = { ...perms };
  configs.forEach((config) => {
    const value = perms[config.key];
    const availablePermissions = config.permissions;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      initialized[config.key] = getSafePermissionObject(
        value,
        availablePermissions
      ) as any;
    } else if (value === undefined || value === null) {
      const emptyPermissions: Record<string, boolean> = {};
      availablePermissions.forEach((perm) => {
        emptyPermissions[perm] = false;
      });
      initialized[config.key] = emptyPermissions as any;
    }
  });
  return initialized;
};

export const ModalForPermissions = ({
  permissions,
  specialization,
  open,
  onClose,
  onSave,
}: {
  permissions: Permissions;
  specialization?: string;
  open: boolean;
  onClose: () => void;
  onSave: (updatedPermissions: Permissions) => void;
}) => {
  const PERMISSION_CONFIGS =
    specialization === "machineBuildingPlant"
      ? PERMISSION_CONFIGS_FACTORY
      : PERMISSION_CONFIGS_INSTITUTE;

  const [editedPermissions, setEditedPermissions] = useState<Permissions>(() =>
    initializePermissions(permissions, PERMISSION_CONFIGS)
  );

  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    PERMISSION_CONFIGS.forEach((config) => {
      config.notifications?.forEach((notif) => {
        const existingEnabled = (permissions as any)?.notificationAccess?.[notif.key]?.enabled;
        initial[notif.key] = existingEnabled ?? false;
      });
    });
    return initial;
  });

  useEffect(() => {
    if (permissions) {
      setEditedPermissions(
        initializePermissions(permissions, PERMISSION_CONFIGS)
      );
      const updated: Record<string, boolean> = {};
      PERMISSION_CONFIGS.forEach((config) => {
        config.notifications?.forEach((notif) => {
          const existingEnabled = (permissions as any)?.notificationAccess?.[notif.key]?.enabled;
          updated[notif.key] = existingEnabled ?? false;
        });
      });
      setNotificationSettings(updated);
    }
  }, [permissions, specialization, PERMISSION_CONFIGS]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEditedPermissions((prev) => ({
      ...prev,
      roles: [value],
    }));
  };

  const handlePermissionChange = (
    permissionType: keyof Permissions,
    field: string,
    value: boolean,
    availablePermissions: string[]
  ) => {
    setEditedPermissions((prev) => ({
      ...prev,
      [permissionType]: {
        ...getSafePermissionObject(prev[permissionType], availablePermissions),
        [field]: value,
      },
    }));
    if (field === "view") {
      const config = PERMISSION_CONFIGS.find(
        (config) => config.key === permissionType
      );
      if (config?.notifications) {
        setNotificationSettings((prev) => {
          const updated = { ...prev };
          config.notifications!.forEach((notif) => {
            updated[notif.key] = value;
          });
          return updated;
        });
      }
    }
  };

  const handleAllPermissionsChange = (
    permissionType: keyof Permissions,
    value: boolean,
    availablePermissions: string[]
  ) => {
    const allPermissions: Record<string, boolean> = {};
    availablePermissions.forEach((perm) => {
      allPermissions[perm] = value;
    });
    setEditedPermissions((prev) => ({
      ...prev,
      [permissionType]: allPermissions,
    }));
    const config = PERMISSION_CONFIGS.find(
      (config) => config.key === permissionType
    );
    if (config?.notifications) {
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
    setNotificationSettings((prev) => ({
      ...prev,
      [notifKey]: value,
    }));
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
    const permissionsWithNotifications = {
      ...editedPermissions,
      notificationAccess,
    };
    onSave(permissionsWithNotifications);
  };

  const handleCancel = () => {
    if (permissions) {
      setEditedPermissions(
        initializePermissions(permissions, PERMISSION_CONFIGS)
      );
    }
    onClose();
  };

  const hasAllPermissions = (
    permissionObject: Record<string, boolean>,
    availablePermissions: string[]
  ): boolean => {
    return availablePermissions.every((perm) => permissionObject[perm]);
  };

  const hasAnyPermission = (
    permissionObject: Record<string, boolean>,
    availablePermissions: string[]
  ): boolean => {
    return availablePermissions.some((perm) => permissionObject[perm]);
  };

  const currentRole = editedPermissions.roles?.[0] || "";

  if (!permissions) {
    return null;
  }

  const getPermissionLabel = (permissionKey: string): string => {
    const labels: Record<string, string> = {
      view: t("buttonView_1"),
      create: t("creation_1"),
      update: t("buttonEdit_1"),
      delete: t("labelDeletion_1"),
    };
    return labels[permissionKey] || permissionKey;
  };

  return (
    <FullScreenDialog
      isOpen={open}
      onClose={handleCancel}
      title={`${t("buttonEditAccessRights_1")} - ${permissions.name}`}
    >
      {/* Roles - admin / user */}
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ mb: 1 }}>
          {t("selectUserRole_1")}
        </FormLabel>
        <RadioGroup value={currentRole} onChange={handleRoleChange} row>
          <FormControlLabel
            value="user"
            control={<Radio />}
            label={t("regularUser_1")}
          />
          <FormControlLabel
            value="admin"
            control={<Radio />}
            label={t("administratorLabel_1")}
          />
        </RadioGroup>
      </FormControl>

      {/* Permissions table */}
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                {t("section_1")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                {t("accessRightsLabel_1")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                {t("notifications_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PERMISSION_CONFIGS.map((config) => {
              const permissionObject = getSafePermissionObject(
                editedPermissions[config.key],
                config.permissions
              );
              const hasAll = hasAllPermissions(
                permissionObject,
                config.permissions
              );
              const hasAny = hasAnyPermission(
                permissionObject,
                config.permissions
              );

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
                    {t(`permissions.${config.key}`)}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Box sx={{ py: 1 }}>
                      {config.permissions.length > 1 && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hasAll}
                              indeterminate={hasAny && !hasAll}
                              onChange={(e) =>
                                handleAllPermissionsChange(
                                  config.key,
                                  e.target.checked,
                                  config.permissions
                                )
                              }
                              color="primary"
                            />
                          }
                          label={t("allRightsLabel_1")}
                          sx={{ mb: 0.5 }}
                        />
                      )}
                      <Box
                        sx={{
                          ml: config.permissions.length > 1 ? 4 : 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {config.permissions.map((perm) => (
                          <FormControlLabel
                            key={perm}
                            control={
                              <Checkbox
                                checked={permissionObject[perm] || false}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    config.key,
                                    perm,
                                    e.target.checked,
                                    config.permissions
                                  )
                                }
                                size={
                                  config.permissions.length > 1
                                    ? "small"
                                    : "medium"
                                }
                              />
                            }
                            label={getPermissionLabel(perm)}
                          />
                        ))}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {config.notifications && config.notifications.length > 0 ? (
                      (() => {
                        const sectionVisible = !!permissionObject["view"];
                        return (
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
                                  disabled={!sectionVisible}
                                />
                              }
                              label={t("notifications_allNotifications")}
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
                                      disabled={!sectionVisible}
                                    />
                                  }
                                  label={t(notif.label)}
                                />
                              ))}
                            </Box>
                          </Box>
                        );
                      })()
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

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 2,
        }}
      >
        <Button onClick={handleCancel} color="secondary" variant="outlined">
          {t("cancel_1")}
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {t("buttonSaveChanges_1")}
        </Button>
      </Box>
    </FullScreenDialog>
  );
};

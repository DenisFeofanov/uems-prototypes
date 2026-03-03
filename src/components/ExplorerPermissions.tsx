import type { SimplifiedPermissions } from "../types";
import { TREE_DATA, findNode, flattenTree } from "../dataTree";
import React, { useState } from "react";
import { SectionTree } from "./SectionTree";
import { SectionDetail } from "./SectionDetail";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface ExplorerPermissionsProps {
  initialPermissions: SimplifiedPermissions;
  onSave: (updatedPermissions: SimplifiedPermissions) => void;
}

export const ExplorerPermissions = ({
  initialPermissions,
  onSave,
}: ExplorerPermissionsProps) => {
  const [editedRoles, setEditedRoles] = useState<string[]>(
    initialPermissions.roles
  );
  const [sectionAccess, setSectionAccess] = useState<Record<string, boolean>>(
    () => ({ ...initialPermissions.sections })
  );
  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    flattenTree(TREE_DATA).forEach((node) => {
      node.notifications?.forEach((notif) => {
        initial[notif.key] =
          initialPermissions.notificationAccess?.[notif.key]?.enabled ?? false;
      });
    });
    return initial;
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(
    new Set()
  );

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRoles([event.target.value]);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAccess = (key: string, value: boolean) => {
    setSectionAccess((prev) => ({ ...prev, [key]: value }));
    const node = flattenTree(TREE_DATA).find((n) => n.key === key);
    if (node?.notifications) {
      setNotificationSettings((prev) => {
        const updated = { ...prev };
        node.notifications!.forEach((notif) => {
          updated[notif.key] = value;
        });
        return updated;
      });
    }
  };

  const handleToggleNotification = (notifKey: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [notifKey]: value }));
  };

  const handleToggleAllNotifications = (
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
      uid: initialPermissions.uid,
      name: initialPermissions.name,
      email: initialPermissions.email,
      roles: editedRoles,
      sections: sectionAccess,
      notificationAccess,
    });
  };

  const handleCancel = () => {
    setEditedRoles(initialPermissions.roles);
    setSectionAccess({ ...initialPermissions.sections });
  };

  const selectedNode = selectedNodeId
    ? findNode(TREE_DATA, selectedNodeId)
    : null;
  const currentRole = editedRoles[0] || "";

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

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          minHeight: 500,
        }}
      >
        <Paper
          variant="outlined"
          sx={{ width: 300, flexShrink: 0, overflow: "auto" }}
        >
          <SectionTree
            treeData={TREE_DATA}
            selectedId={selectedNodeId}
            expandedIds={expandedNodeIds}
            sectionAccess={sectionAccess}
            onSelect={setSelectedNodeId}
            onToggleExpand={handleToggleExpand}
          />
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, overflow: "auto" }}>
          {selectedNode ? (
            <SectionDetail
              node={selectedNode}
              hasAccess={!!sectionAccess[selectedNode.key]}
              notificationSettings={notificationSettings}
              onToggleAccess={handleToggleAccess}
              onToggleNotification={handleToggleNotification}
              onToggleAllNotifications={handleToggleAllNotifications}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography color="text.secondary">
                Выберите раздел слева
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

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

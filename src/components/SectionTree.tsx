import type { TreeNode } from "../dataTree";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface SectionTreeProps {
  treeData: TreeNode[];
  selectedId: string | null;
  expandedIds: Set<string>;
  sectionAccess: Record<string, boolean>;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

function TreeNodeItem({
  node,
  depth,
  selectedId,
  expandedIds,
  sectionAccess,
  onSelect,
  onToggleExpand,
}: {
  node: TreeNode;
  depth: number;
  selectedId: string | null;
  expandedIds: Set<string>;
  sectionAccess: Record<string, boolean>;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const hasAccess = !!sectionAccess[node.key];

  const handleClick = () => {
    onSelect(node.id);
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  return (
    <>
      <ListItemButton
        selected={isSelected}
        onClick={handleClick}
        sx={{ pl: 2 + depth * 2 }}
      >
        {hasChildren && (
          <ListItemIcon sx={{ minWidth: 32 }}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        )}
        {!hasChildren && <ListItemIcon sx={{ minWidth: 32 }} />}
        <ListItemText primary={node.label} />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: hasAccess ? "success.main" : "grey.400",
            flexShrink: 0,
            ml: 1,
          }}
        />
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {node.children!.map((child) => (
              <TreeNodeItem
                key={child.id}
                node={child}
                depth={depth + 1}
                selectedId={selectedId}
                expandedIds={expandedIds}
                sectionAccess={sectionAccess}
                onSelect={onSelect}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export const SectionTree = ({
  treeData,
  selectedId,
  expandedIds,
  sectionAccess,
  onSelect,
  onToggleExpand,
}: SectionTreeProps) => {
  return (
    <List disablePadding>
      {treeData.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          expandedIds={expandedIds}
          sectionAccess={sectionAccess}
          onSelect={onSelect}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </List>
  );
};

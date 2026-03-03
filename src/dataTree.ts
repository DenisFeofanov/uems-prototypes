export interface TreeNode {
  id: string;
  label: string;
  key: string;
  notifications?: { key: string; label: string }[];
  children?: TreeNode[];
}

export interface FlatSectionConfig {
  key: string;
  label: string;
  notifications?: { key: string; label: string }[];
}

export const DUMMY_HOST_TRADES_NOTIFICATIONS = [
  { key: "host-trades-reoffer-deadline-passed", label: "Уведомление 1" },
  { key: "host-trades-new-trade-question", label: "Уведомление 2" },
  { key: "host-trades-deal-reoffer-expired", label: "Уведомление 3" },
  { key: "host-trades-deal-reoffer-accepted", label: "Уведомление 4" },
  { key: "host-trades-offer-submitted", label: "Уведомление 5" },
];

export const DUMMY_BIDDER_TRADES_NOTIFICATIONS = [
  { key: "bidder-trades-registered-company-invitation", label: "Уведомление 1" },
  { key: "bidder-trades-non-registered-company-invitation", label: "Уведомление 2" },
  { key: "bidder-trades-offer-collection-completed", label: "Уведомление 3" },
  { key: "bidder-trades-reoffer-requested", label: "Уведомление 4" },
  { key: "bidder-trades-reoffer-deadline-passed", label: "Уведомление 5" },
  { key: "bidder-trades-winner-selected", label: "Уведомление 6" },
  { key: "bidder-trades-offer-collection-deadline-extended", label: "Уведомление 7" },
  { key: "bidder-trades-question-answered", label: "Уведомление 8" },
  { key: "bidder-trades-deal-reoffer-received", label: "Уведомление 9" },
  { key: "bidder-trades-deal-reoffer-expired", label: "Уведомление 10" },
  { key: "bidder-trades-deal-reoffer-accepted", label: "Уведомление 11" },
];

export const DUMMY_LOTUS_NOTIFICATIONS = [
  { key: "lotus-calc-started", label: "Уведомление 1" },
  { key: "lotus-calc-completed", label: "Уведомление 2" },
  { key: "lotus-calc-error", label: "Уведомление 3" },
];

export const DUMMY_CALC_TOOLS_NOTIFICATIONS = [
  { key: "calc-tools-update-available", label: "Уведомление 1" },
  { key: "calc-tools-result-ready", label: "Уведомление 2" },
];

export const DUMMY_VAR_COMPLEXITY_NOTIFICATIONS = [
  { key: "var-complexity-threshold-exceeded", label: "Уведомление 1" },
  { key: "var-complexity-report-generated", label: "Уведомление 2" },
  { key: "var-complexity-config-changed", label: "Уведомление 3" },
  { key: "var-complexity-approval-required", label: "Уведомление 4" },
];

export const TREE_DATA: TreeNode[] = [
  {
    id: "1",
    label: "Раздел 1",
    key: "hostTrades",
    notifications: DUMMY_HOST_TRADES_NOTIFICATIONS,
  },
  { id: "2", label: "Раздел 2", key: "tradePosition" },
  {
    id: "3",
    label: "Раздел 3",
    key: "bidderTrades",
    notifications: DUMMY_BIDDER_TRADES_NOTIFICATIONS,
  },
  { id: "4", label: "Раздел 4", key: "tradeInvitations" },
  { id: "5", label: "Раздел 5", key: "order" },
  { id: "6", label: "Раздел 6", key: "searchCompanies" },
  {
    id: "7",
    label: "Раздел 7",
    key: "tools",
    children: [
      {
        id: "7.1",
        label: "Раздел 7.1",
        key: "lotusSTHE",
        notifications: DUMMY_LOTUS_NOTIFICATIONS,
      },
      {
        id: "7.2",
        label: "Раздел 7.2",
        key: "menuCalculationTools",
        children: [
          {
            id: "7.2.1",
            label: "Раздел 7.2.1",
            key: "calculationTools",
            notifications: DUMMY_CALC_TOOLS_NOTIFICATIONS,
          },
          { id: "7.2.2", label: "Раздел 7.2.2", key: "toolsEllipticalBottom" },
          { id: "7.2.3", label: "Раздел 7.2.3", key: "toolsShell" },
        ],
      },
      {
        id: "7.3",
        label: "Раздел 7.3",
        key: "variableComplexity",
        notifications: DUMMY_VAR_COMPLEXITY_NOTIFICATIONS,
      },
    ],
  },
  { id: "8", label: "Раздел 8", key: "apparatus" },
];

export const DUMMY_FLAT_CONFIGS: FlatSectionConfig[] = [
  { key: "hostTrades", label: "Раздел 1", notifications: DUMMY_HOST_TRADES_NOTIFICATIONS },
  { key: "tradePosition", label: "Раздел 2" },
  { key: "bidderTrades", label: "Раздел 3", notifications: DUMMY_BIDDER_TRADES_NOTIFICATIONS },
  { key: "tradeInvitations", label: "Раздел 4" },
  { key: "order", label: "Раздел 5" },
  { key: "searchCompanies", label: "Раздел 6" },
  { key: "tools", label: "Раздел 7" },
  { key: "lotusSTHE", label: "Раздел 7.1", notifications: DUMMY_LOTUS_NOTIFICATIONS },
  { key: "menuCalculationTools", label: "Раздел 7.2" },
  { key: "calculationTools", label: "Раздел 7.2.1", notifications: DUMMY_CALC_TOOLS_NOTIFICATIONS },
  { key: "toolsEllipticalBottom", label: "Раздел 7.2.2" },
  { key: "toolsShell", label: "Раздел 7.2.3" },
  { key: "variableComplexity", label: "Раздел 7.3", notifications: DUMMY_VAR_COMPLEXITY_NOTIFICATIONS },
  { key: "apparatus", label: "Раздел 8" },
];

export function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children) {
      result.push(...flattenTree(node.children));
    }
  }
  return result;
}

export function findNode(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

export function isTopLevel(nodes: TreeNode[], id: string): boolean {
  return nodes.some((node) => node.id === id);
}

export interface PermissionObject {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface Permissions {
  uid: string;
  roles: string[]; // admin, user
  token?: string;
  hostTrades?: PermissionObject;
  tradePosition?: PermissionObject;
  bidderTrades?: PermissionObject;
  tradeInvitations?: PermissionObject;
  order?: PermissionObject;
  searchCompanies?: PermissionObject;
  tools?: PermissionObject;
  apparatus?: PermissionObject;
  lotusSTHE?: PermissionObject;
  calculationTools?: PermissionObject;
  menuCalculationTools: PermissionObject;
  variableComplexity?: PermissionObject;
  project?: PermissionObject;
  projectLotusSTHE?: PermissionObject;
  toolsEllipticalBottom?: PermissionObject;
  toolsShell?: PermissionObject;
  name: string;
  email: string;
  notificationAccess?: Record<string, { enabled: boolean }>;
}

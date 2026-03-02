import type { Permissions } from "./types";

export interface PermissionConfig {
  label: string;
  key: keyof Permissions;
  permissions: string[];
  notifications?: { key: string; label: string }[];
}

const STANDARD_PERMISSIONS = ["view", "create", "update", "delete"];

export const HOST_TRADES_NOTIFICATIONS = [
  { key: "host-trades-reoffer-deadline-passed", label: "notifications_hostTradesReofferDeadlinePassed" },
  { key: "host-trades-new-trade-question", label: "notifications_hostTradesNewTradeQuestion" },
  { key: "host-trades-deal-reoffer-expired", label: "notifications_hostTradesDealReofferExpired" },
  { key: "host-trades-deal-reoffer-accepted", label: "notifications_hostTradesDealReofferAccepted" },
  { key: "host-trades-offer-submitted", label: "notifications_hostTradesOfferSubmitted" },
];

export const BIDDER_TRADES_NOTIFICATIONS = [
  { key: "bidder-trades-registered-company-invitation", label: "notifications_bidderTradesRegisteredCompanyInvitation" },
  { key: "bidder-trades-non-registered-company-invitation", label: "notifications_bidderTradesNonRegisteredCompanyInvitation" },
  { key: "bidder-trades-offer-collection-completed", label: "notifications_bidderTradesOfferCollectionCompleted" },
  { key: "bidder-trades-reoffer-requested", label: "notifications_bidderTradesReofferRequested" },
  { key: "bidder-trades-reoffer-deadline-passed", label: "notifications_bidderTradesReofferDeadlinePassed" },
  { key: "bidder-trades-winner-selected", label: "notifications_bidderTradesWinnerSelected" },
  { key: "bidder-trades-offer-collection-deadline-extended", label: "notifications_bidderTradesOfferCollectionDeadlineExtended" },
  { key: "bidder-trades-question-answered", label: "notifications_bidderTradesQuestionAnswered" },
  { key: "bidder-trades-deal-reoffer-received", label: "notifications_bidderTradesDealReofferReceived" },
  { key: "bidder-trades-deal-reoffer-expired", label: "notifications_bidderTradesDealReofferExpired" },
  { key: "bidder-trades-deal-reoffer-accepted", label: "notifications_bidderTradesDealReofferAccepted" },
];

export const PERMISSION_CONFIGS_FACTORY: PermissionConfig[] = [
  { label: "Собственные закупки", key: "hostTrades", permissions: STANDARD_PERMISSIONS, notifications: HOST_TRADES_NOTIFICATIONS },
  { label: "Шаблоны позиций", key: "tradePosition", permissions: STANDARD_PERMISSIONS },
  { label: "Участие в закупках", key: "bidderTrades", permissions: STANDARD_PERMISSIONS, notifications: BIDDER_TRADES_NOTIFICATIONS },
  { label: "Приглашения на закупку", key: "tradeInvitations", permissions: STANDARD_PERMISSIONS },
  { label: "Заказ-наряды", key: "order", permissions: STANDARD_PERMISSIONS },
  { label: "Поиск компаний", key: "searchCompanies", permissions: ["view"] },
  { label: "Инструменты", key: "tools", permissions: STANDARD_PERMISSIONS },
  { label: "Реестр аппаратов", key: "apparatus", permissions: STANDARD_PERMISSIONS },
  { label: "Инструменты: LOTUS STHE", key: "lotusSTHE", permissions: STANDARD_PERMISSIONS },
  { label: "Инструменты: Меню трудоемкости", key: "menuCalculationTools", permissions: STANDARD_PERMISSIONS },
  { label: "Инструменты: Переменные трудоемкости", key: "variableComplexity", permissions: STANDARD_PERMISSIONS },
  { label: "Меню трудоемкости: Трудоемкости аппарата", key: "calculationTools", permissions: STANDARD_PERMISSIONS },
  { label: "Меню трудоемкости: Днище (эллиптическое)", key: "toolsEllipticalBottom", permissions: STANDARD_PERMISSIONS },
  { label: "Меню трудоемкости: Обечайка", key: "toolsShell", permissions: STANDARD_PERMISSIONS },
];

export const PERMISSION_CONFIGS_INSTITUTE: PermissionConfig[] = [
  { label: "Собственные закупки", key: "hostTrades", permissions: STANDARD_PERMISSIONS, notifications: HOST_TRADES_NOTIFICATIONS },
  { label: "Шаблоны позиций", key: "tradePosition", permissions: STANDARD_PERMISSIONS },
  { label: "Участие в закупках", key: "bidderTrades", permissions: STANDARD_PERMISSIONS, notifications: BIDDER_TRADES_NOTIFICATIONS },
  { label: "Приглашения на закупку", key: "tradeInvitations", permissions: STANDARD_PERMISSIONS },
  { label: "Заказ-наряды", key: "order", permissions: STANDARD_PERMISSIONS },
  { label: "Поиск компаний", key: "searchCompanies", permissions: ["view"] },
  { label: "Инструменты", key: "tools", permissions: STANDARD_PERMISSIONS },
  { label: "Инструменты: LOTUS STHE", key: "lotusSTHE", permissions: STANDARD_PERMISSIONS },
  { label: "Инструменты: Меню трудоемкости", key: "menuCalculationTools", permissions: STANDARD_PERMISSIONS },
  { label: "Инструменты: Переменные трудоемкости", key: "variableComplexity", permissions: STANDARD_PERMISSIONS },
  { label: "Меню трудоемкости: Трудоемкости аппарата", key: "calculationTools", permissions: STANDARD_PERMISSIONS },
  { label: "Меню трудоемкости: Днище (эллиптическое)", key: "toolsEllipticalBottom", permissions: STANDARD_PERMISSIONS },
  { label: "Меню трудоемкости: Обечайка", key: "toolsShell", permissions: STANDARD_PERMISSIONS },
  { label: "Реестр аппаратов", key: "apparatus", permissions: STANDARD_PERMISSIONS },
  { label: "Проекты", key: "project", permissions: STANDARD_PERMISSIONS },
];

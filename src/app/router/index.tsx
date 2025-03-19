import { BrandBookPage } from "@pages/BrandBookPage";
import { HomePage } from "@pages/HomePage";
import { MatchPage } from "@pages/MatchPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { PlayerPage } from "@pages/PlayerPage";
import { PlayerSettingsPage } from "@pages/PlayerSettingsPage";
import { PlayPage } from "@pages/PlayPage";
import { RankingsPage } from "@pages/RankingsPage";
import { RulesPage } from "@pages/RulesPage";
import { SubscriptionPage } from "@pages/SubscriptionPage";
import React from "react";

export interface PrivacyRequirements {
  authRequire: boolean;
  perms: string | null;
}

export interface IRoute {
  path: string;
  element: React.CElement<any, any>;
  privacy: PrivacyRequirements;
}

export enum RoutesEnum {
  HOME_PAGE = "/",
  PLAYER_PAGE = "/player/:username",
  SETTINGS_PAGE = "/settings",
  MATCH_PAGE = "/match/:id",
  PLAY_PAGE = "/play",
  SUBSCRIPTION_PAGE = "/subscription",
  RULES_PAGE = "/rules",
  RANKINGS_PAGE = "/rankings",
  NOTFOUND_PAGE = "*",
}

const setPrivacy: any = (
  authRequire: boolean,
  perms: string | null
): PrivacyRequirements => {
  return { authRequire: authRequire, perms: perms };
};

export const routes: Array<IRoute> = [
  {
    path: RoutesEnum.HOME_PAGE,
    element: <HomePage />,
    privacy: setPrivacy(false, null),
  },
  {
    path: RoutesEnum.PLAYER_PAGE,
    element: <PlayerPage />,
    privacy: setPrivacy(false, null),
  },
  {
    path: RoutesEnum.MATCH_PAGE,
    element: <MatchPage />,
    privacy: setPrivacy(true, null),
  },
  {
    path: RoutesEnum.PLAY_PAGE,
    element: <PlayPage />,
    privacy: setPrivacy(true, null),
  },
  {
    path: RoutesEnum.SUBSCRIPTION_PAGE,
    element: <SubscriptionPage />,
    privacy: setPrivacy(false, null),
  },
  {
    path: RoutesEnum.RULES_PAGE,
    element: <RulesPage />,
    privacy: setPrivacy(false, null),
  },
  {
    path: RoutesEnum.SETTINGS_PAGE,
    element: <PlayerSettingsPage />,
    privacy: setPrivacy(true, null),
  },
  {
    path: RoutesEnum.RANKINGS_PAGE,
    element: <RankingsPage />,
    privacy: setPrivacy(false, null),
  },
  {
    path: RoutesEnum.NOTFOUND_PAGE,
    element: <NotFoundPage />,
    privacy: setPrivacy(false, null),
  },
];

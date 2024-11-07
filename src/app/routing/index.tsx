import { HomePage } from "@pages/home/ui";
import { LeaderboardPage } from "@pages/leaderboard/ui";
import { ProfilePage } from "@pages/profile/ui";
import { paths } from "@shared/router";
import { BaseLayout } from "@shared/ui/layouts/base";
import { ContentSlot, ShellSlot } from "@shared/ui/layouts/slots";
import { SuspenseLayout } from "@shared/ui/layouts/suspense";
import { Shell } from "@widgets/navigation/shell";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";

const routes = (): RouteObject[] => [
    {
        path: paths.index,
        element: (
            <BaseLayout>
                <ShellSlot>
                    <Shell />
                </ShellSlot>
                <ContentSlot>
                    <Outlet />
                </ContentSlot>
            </BaseLayout>
        ),
        children: [
            {
                path: paths.index,
                element: <HomePage />
            },
            {
                path: paths.leaderboard,
                element: <LeaderboardPage />
            },
            {
                path: paths.profile,
                element: <ProfilePage />
            }
        ]
    },
    {
        path: paths.catch,
        element: <Navigate replace to={paths.index}/>
    },
]

export const AppRouter = () => {
    return <SuspenseLayout>{useRoutes(routes())}</SuspenseLayout>
}

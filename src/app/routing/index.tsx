import { HomePage } from "@pages/home/ui";
import { paths } from "@shared/router";
import { SuspenseLayout } from "@shared/ui/layouts/suspense";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const routes = (): RouteObject[] => [
    {
        path: paths.index,
        element: <HomePage/>
    },
    {
        path: paths.catch,
        element: <Navigate replace to={paths.index}/>
    }
]

export const AppRouter = () => {
    return <SuspenseLayout>{useRoutes(routes())}</SuspenseLayout>
}

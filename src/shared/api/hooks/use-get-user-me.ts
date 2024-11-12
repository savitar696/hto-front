import { useUserQuery } from "../get-user.me";

export const useGetUsersMe = () => {
    const { data, isLoading: loading, isError, refetch, error } = useUserQuery();

    const formattedError = isError ? error : null;

    return { data, loading, error: formattedError, refetch };
 };

import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
    const DEV_TOKEN = localStorage.getItem('DEV_TOKEN')
    const resp = await fetch("http://localhost:3000/api/v1/users/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": `${DEV_TOKEN}`,
        },
    });
    if (!resp.ok) throw new Error("Ошибка при получении данных о пользователе");

    return resp.json();
};

export const useUserQuery = () => {
    return useQuery({
        queryKey: ["userMe"],
        queryFn: fetchUser,
        staleTime: 30 * 60 * 1000, // Данные считаются актуальными 5 минут
    });
};

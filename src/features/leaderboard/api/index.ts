import { api } from "@shared/api"

export const fetchRankings = async () => {
    return await api.get('user/ranking')
}

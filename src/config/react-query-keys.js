
export const REACT_QUERY_KEYS = {
    catalog: {
        profile: {
            getAll: (key) => `get-all-profile-${key}`
        },
        lada_phone: {
            getAll: (key) => `get-all-lada-profile-${key}`
        }
    },
    user: {
        getDataByToken: (key) => `get-data-by-token-${key}`
    }
}
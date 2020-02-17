export const filterMenu = (keyword) => {
    return {
        type: 'SEARCH_SUCCESS',
        payload: {
            keyword: keyword
        }
    }
}
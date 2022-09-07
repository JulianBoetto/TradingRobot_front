export const apiUrl =
    process.env.REACT_APP_ENV === 'homolog'
        ? process.env.REACT_APP_CORE_API_HOMOLOG
        : process.env.REACT_APP_CORE_API;
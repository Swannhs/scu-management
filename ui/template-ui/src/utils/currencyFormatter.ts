export const currencyFormatter = (value: number | string | null) => {
    if (!value) {
        return '';
    }
    return parseInt(value.toString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

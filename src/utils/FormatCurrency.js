export default function formatCurrency(num) {
    if (isNaN(num)) {
        return 0
    }
    const formattedAmount = parseFloat(num).toFixed(2);
    return formattedAmount
}
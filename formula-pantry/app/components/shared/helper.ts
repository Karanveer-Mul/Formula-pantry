export function truncateContent(content: string, length?: number) {

    if (length == undefined) {
        length = 40
    }

    return (content.length + 3) > length ? content.substring(0, length) + "..." : content

} 

export function convertUtcTimeToMonthDate(time: string) {
    return new Date(time).toLocaleDateString("en-US", { month: "short", day: "numeric"})
}

export function convertUtcTimeToMonthDateYear(time: string) {
    return new Date(time).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})
}

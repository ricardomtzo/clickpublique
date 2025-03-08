export const isMobile = () => {
    if (typeof window !== "undefined") {
        // Código que usa window
        return window.innerWidth < 600
    } else {
        return false
    }
}
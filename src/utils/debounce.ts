export const debounce = <T extends AnyFunction>(
    func: T,
    timeout = 1000
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => func.apply(this, args), timeout)
    }
}

type AnyFunction = (...args: unknown[]) => unknown
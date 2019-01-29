export const clamp = (val, min, max) => {
    return Math.min(val, Math.max(val, min))
}

const guids = []

// ensure creation of a unique GUID
export function createGuid(desired = '') {
    while (guids.indexOf(desired) != -1 || !desired.length) {
        desired = Date.now().toString()
    }
    guids.push(desired)

    return desired
}

// default picker
export const buildPick = opts => {
    return (name, defaultVal) => {
        return opts.hasOwnProperty(name) ? opts[name] : defaultVal
    }
}

// x and y calculations
export function getX(i: number, width: number): number {
    return i % width
}
export function getY(i: number, width: number, totalCells: number): number {
    // if we're in the first row, get ready to decrement by 1
    let modifier = 0
    if (i % width === 0) {
        modifier = 1
    }

    // calculate Y coordinate from current index
    return Math.floor((totalCells - i) / width) - modifier
}

const guids = new Array<string>()

// ensure creation of a unique GUID
export function createGuid(desired: string = '') {
    while (guids.indexOf(desired) != -1 || !desired.length) {
        desired = Date.now().toString()
    }

    return desired
}

export const clamp = (val, min, max) => {
    return Math.min(val, Math.max(val, min))
}

// default picker
export const buildPick = opts => {
    return (name, defaultVal) => {
        return opts.hasOwnProperty(name) ? opts[name] : defaultVal
    }
}

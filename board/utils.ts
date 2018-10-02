// default picker
export const buildPick = opts => {
    return (name, defaultVal) => {
        return opts.hasOwnProperty(name) ? opts[name] : defaultVal
    }
}

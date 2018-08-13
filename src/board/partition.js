export default class {
    constructor(opts = {}) {
        // default picker
        function pick(name, defaultVal) {
            return opts.hasOwnProperty(name) ? opts[name] : defaultVal
        }

        this.width = pick('width', 3)
        this.height = pick('height', 3)

        // pivot Cell in x,y coordinates
        this.pivot = pick('pivot', { x: 0, y: 0 })

        // position on game board in x,y coordinates
        this.position = pick('position', { x: 0, y: 0 })
    }
}

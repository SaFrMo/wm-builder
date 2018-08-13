export default class {
    constructor(opts = {}) {
        // default picker
        function pick(name, defaultVal) {
            return opts.hasOwnProperty(name) ? opts[name] : defaultVal
        }

        this.width = pick('width', 2)
        this.height = pick('height', 2)

        // pivot Cell in x,y coordinates
        this.pivot = pick('pivot', { x: 0, y: 0 })

        // position on game board in x,y coordinates
        this.position = pick('position', { x: 0, y: 0 })

        // human-readable name
        this.name = pick('name', 'Partition')

        // GUID
        this.guid = pick('guid', Date.now())
    }
}

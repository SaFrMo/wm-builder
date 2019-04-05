import Vue from 'vue'

const autosavePrefix = 'wm-board-autosave-'
const forceLoad = 'force-load'

export default {
    data() {
        return {
            interval: null,
            autosaveInterval: 1000
        }
    },
    async mounted() {
        if (localStorage.length) {
            // get array of all localStorage keys
            const timestamps = []
            for (var i = 0, len = localStorage.length; i < len; ++i) {
                if (localStorage.key(i).includes(autosavePrefix)) {
                    // find timestamps of keys
                    const number = localStorage
                        .key(i)
                        .replace(autosavePrefix, '')
                    timestamps.push(parseInt(number))
                }
            }

            // find latest save
            let toLoadGuid = ''

            if (localStorage[forceLoad]) {
                toLoadGuid = localStorage[forceLoad]
            } else {
                // default to most recent timestamp
                toLoadGuid = Math.max.apply(Math, timestamps)
            }

            this.$store.commit(
                'LOAD_LEVEL',
                localStorage.getItem(`${autosavePrefix}${toLoadGuid}`)
            )
        }

        if (!this.interval) {
            // autosave every X seconds
            this.interval = setInterval(this.runAutosave, this.autosaveInterval)
        }
    },
    methods: {
        runAutosave() {
            localStorage.setItem(
                `${autosavePrefix}${this.$store.state.boardState.guid}`,
                JSON.stringify(this.$store.state.boardState)
            )
        }
    },
    beforeDestroy() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
}

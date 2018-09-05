import Vue from 'vue'

export default {
    data() {
        return {
            interval: null,
            autosaveInterval: 2000
        }
    },
    async mounted() {
        if (localStorage.length) {
            // get the last autosave for this board
            const latest = localStorage.key(0)
            this.$store.commit('LOAD_LEVEL', localStorage.getItem(latest))
        }

        if (!this.interval) {
            // autosave every X seconds
            this.interval = setInterval(this.runAutosave, this.autosaveInterval)
        }
    },
    methods: {
        runAutosave() {
            localStorage.setItem(
                `wm-board-autosave-${this.$store.state.boardState.guid}`,
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

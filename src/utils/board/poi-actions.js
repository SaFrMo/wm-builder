export default {
    ADD_POI: (state, payload) => {
        state.pois.push(payload)
    },
    REMOVE_POI: (state, { guid, coordinates }) => {
        state.pois = state.pois.filter(poi => {
            return !(
                poi.guid == guid &&
                poi.coordinates.x == coordinates.x &&
                poi.coordinates.y == coordinates.y
            )
        })
    }
}

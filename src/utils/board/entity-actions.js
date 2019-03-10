export default {
    ADD_ENTITY: (state, payload) => {
        state.entities.push(payload)
    },
    REMOVE_ENTITY: (state, { guid, coordinates }) => {
        state.entities = state.entities.filter(entity => {
            return !(
                entity.location.partitionGuid == guid &&
                entity.coordinates.x == coordinates.x &&
                entity.coordinates.y == coordinates.y
            )
        })
    }
}

import uuidv4 from "../../utils/uiudv4"
import fileExt from "../../utils/fileExt"

//const firebase = window.firebase

const state = function() {
    return {
        positions: [],
        selectedPosition: {},
        addPositionLoading: false,
        addPositionHasError: false,
        positionImages: {},
        selectedPositionImages: []

    }
}

const getters = {
    positions(state) {
        return state.positions
    },
    positionImages(state) {
        return state.positionImages[state.selectedPosition.key]
    }
}

const mutations = {
    SET_ADD_POSITION_LOADING(state, value) {
        state.addPositionLoading = value
    },
    SET_ADD_POSITION_HAS_ERROR(state, value) {
        state.addPositionHasError = value
    },
    SET_POSITIONS(state, data) {
        if (state.positions.length == 0)
            state.positions = data
        else
            state.positions.push(data)
    },
    SET_SELECTED_POSITION(state, position) {
        state.selectedPosition = position
    },
    SET_SELECTED_POSITION_IMAGES(state, value) {
        state.selectedPositionImages = value
    },
    ADD_POSITION_IMAGES(state, { key, images }) {
        state.positionImages[key] = images
    }
}
const actions = {
    async allPositions({ commit, getters }) {

        window.firebase.database().ref('positions').on("value", (snapshot) => {
            const items = snapshot.val()
            const keys = Object.keys(items)

            if (getters.positions.length == 0) {
                const data = keys.map((key) => {
                        return {...items[key], "key": key }
                    })
                    //console.log('empty', data)
                commit('SET_POSITIONS', data)
            } else {
                const key = keys[keys.length - 1]
                const data = {...items[key], "key": key }
                    //console.log('fill', items, keys, data)
                commit('SET_POSITIONS', data)
            }
        })

    },
    async savePosition({ commit }, { files, position, description }) {
        commit('SET_ADD_POSITION_LOADING', true)
            // Create unique filename for each image files we receive
        const filenames = files.map(f => uuidv4() + '.' + fileExt(f.name))
            // add the filename to the request object
        position.images = filenames
        position.description = description

        try {

            await Promise.all([
                // Save position info to database
                window.firebase.database().ref('positions').push(position),
                // Save position images to database
                ...filenames.map((e, i) => {
                    const path = 'images/positions/' + e
                    return window.firebase.storage().ref(path).put(files[i])
                })
            ])

            commit('SET_ADD_POSITION_LOADING', false)
            alert('La sauvegarde a réussi')
        } catch (error) {
            commit('SET_ADD_POSITION_LOADING', false)
            commit('SET_ADD_POSITION_HAS_ERROR', true)
            setTimeout(() => {
                commit('SET_ADD_POSITION_HAS_ERROR', false)
            }, 5000);
        }

    },

    async updateSelectedPosition({ commit, state, dispatch }, position) {
        if (position.key != state.selectedPosition.key) {
            commit('SET_SELECTED_POSITION', position)
            dispatch('loadPositionImages')
        }

    },

    async loadPositionImages({ commit, state }) {
        commit('SET_SELECTED_POSITION_IMAGES', [])
            // Check if we haven't images of current selected position before load
        if (state.positionImages[state.selectedPosition.key] == undefined) {

            // Get all the images of the selected position
            const images = await Promise.all(
                state.selectedPosition.images.map((e) => {
                    const path = "images/positions/" + e;
                    return window.firebase.storage().ref().child(path)
                        .getDownloadURL()
                })
            )
            commit('ADD_POSITION_IMAGES', { key: state.selectedPosition.key, images })
            commit('SET_SELECTED_POSITION_IMAGES', images)


        } else commit('SET_SELECTED_POSITION_IMAGES', state.positionImages[state.selectedPosition.key])
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
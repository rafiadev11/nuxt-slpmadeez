export const state = () => ({
    disorders: [],
    unusedDisorders: []
});

export const mutations = {
    GET_DISORDERS(state, data) {
        state.disorders = data;
    },
    GET_UNUSED_DISORDERS(state, data) {
        state.unusedDisorders = data;
    },
    ADD_DISORDER(state, data) {
        state.disorders.push(data);
    },
    UPDATE_DISORDER(state, data) {
        state.disorders.find(disorder => {
            if (disorder.id === data.id) {
                disorder.name = data.name;
            }
        });
    },
    DELETE_DISORDER(state, { data, index }) {
        if (data) {
            state.disorders.splice(index, 1);
        }
    }
};

export const actions = {
    async getDisorders({ commit }) {
        const response = await $nuxt.$getDisorders();
        commit("GET_DISORDERS", response.data);
    },
    async getUnusedDisorders({ commit }, studentId) {
        const response = await $nuxt.$getUnusedDisorders(studentId);
        commit("GET_UNUSED_DISORDERS", response.data);
    },
    async addDisorder({ commit }, formData) {
        const response = await $nuxt.$addDisorder(formData);
        commit("ADD_DISORDER", response.data);
        return response;
    },
    async updateDisorder({ commit }, formData) {
        const response = await $nuxt.$updateDisorder(formData);
        commit("UPDATE_DISORDER", response.data);
        return response;
    },
    async deleteDisorder({ commit }, { id, index }) {
        const { data } = await $nuxt.$deleteDisorder(id);
        commit("DELETE_DISORDER", { data, index });
        return data;
    }
};

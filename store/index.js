export const state = () => ({
    sideNavHidden: true
});

export const mutations = {
    show(state) {
        state.sideNavHidden = false;
    },
    hide(state) {
        state.sideNavHidden = true;
    }
};

export const getters = {};

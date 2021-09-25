const disorders = $axios => ({
    getDisorders: async () => {
        return await $axios.get("/api/disorders");
    },
    // getSchool: async id => {
    //     return await $axios.get("/api/schools/" + id);
    // },
    addDisorder: async formData => {
        return await $axios.post("/api/disorders", formData);
    },
    updateDisorder: async formData => {
        return await $axios.patch("/api/disorders/" + formData.id, formData);
    },
    deleteDisorder: async id => {
        return await $axios.delete("/api/disorders/" + id);
    }
});
export default disorders;

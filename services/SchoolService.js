const schools = $axios => ({
    getSchools: async () => {
        return await $axios.get("/api/schools");
    },
    getSchool: async id => {
        return await $axios.get("/api/schools/" + id);
    },
    addSchool: async formData => {
        return await $axios.post("/api/schools", formData);
    },
    updateSchool: async formData => {
        return await $axios.patch("/api/schools/" + formData.id, formData);
    },
    deleteSchool: async id => {
        return await $axios.delete("/api/schools/" + id);
    }
});
export default schools;

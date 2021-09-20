const schools = $axios => ({
    getSchools: async () => {
        return await $axios.get("/api/schools");
    },
    getSchool: async id => {
        return await $axios.get("/api/schools/" + id);
    },
    addSchool: async formData => {
        return await $axios.post("/api/schools", formData);
    }
});
export default schools;

const schools = $axios => ({
    getSchoolYears: async schoolId => {
        return await $axios.get("/api/school-years/school/" + schoolId);
    },
    getSchoolYear: async id => {
        return await $axios.get("/api/school-years/" + id);
    },
    addSchoolYear: async formData => {
        return await $axios.post("/api/school-years", formData);
    },
    updateSchoolYear: async formData => {
        return await $axios.patch("/api/school-years/" + formData.id, formData);
    },
    deleteSchoolYear: async id => {
        return await $axios.delete("/api/school-years/" + id);
    }
});
export default schools;

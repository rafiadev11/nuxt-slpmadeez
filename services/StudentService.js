const students = $axios => ({
    getStudents: async (schoolYearId, disorderId) => {
        return await $axios.get(
            "/api/students/" + schoolYearId + "/" + disorderId
        );
    },
    addStudent: async formData => {
        return await $axios.post("/api/students", formData);
    }
    // updateSchool: async formData => {
    //     return await $axios.patch("/api/schools/" + formData.id, formData);
    // },
    // deleteSchool: async id => {
    //     return await $axios.delete("/api/schools/" + id);
    // }
});
export default students;

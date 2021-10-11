const students = $axios => ({
    getStudents: async (schoolYearId, disorderId) => {
        return await $axios.get(
            "/api/students/" + schoolYearId + "/" + disorderId
        );
    },
    addStudent: async formData => {
        return await $axios.post("/api/students", formData);
    },
    updateStudent: async formData => {
        return await $axios.patch("/api/students/" + formData.id, formData);
    },
    addStudentDisorder: async formData => {
        return await $axios.post("/api/student/disorder", formData);
    }
});
export default students;

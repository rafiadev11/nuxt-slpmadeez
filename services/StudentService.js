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
    },
    getSchedule: async goalId => {
        return await $axios.get("/api/student/schedule/" + goalId);
    },
    updateSchedule: async formData => {
        return await $axios.post("/api/student/update-schedule", formData);
    },
    getObjectives: async goalId => {
        return await $axios.get("/api/student/objectives/" + goalId);
    },
    updateObjectives: async formData => {
        return await $axios.post("/api/student/update-objectives", formData);
    },
    studentDeactivate: async goalId => {
        return await $axios.post("/api/student/deactivate", goalId);
    },
    studentTransfer: async formData => {
        return await $axios.post("/api/student/transfer", formData);
    }
});
export default students;

import SchoolService from "@/services/SchoolService";
export default ({ $axios }, inject) => {
    const allMethods = {
        ...SchoolService($axios)
        // import another service here
    };
    const methods = Object.keys(allMethods);
    methods.forEach(method => {
        inject(method, allMethods[method]);
    });
};

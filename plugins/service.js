import SchoolService from "@/services/SchoolService";
import SchoolYearService from "@/services/SchoolYearService";
import DisorderService from "@/services/DisorderService";
import StudentService from "@/services/StudentService";

export default ({ $axios }, inject) => {
    const allMethods = {
        ...SchoolService($axios),
        ...SchoolYearService($axios),
        ...DisorderService($axios),
        ...StudentService($axios)
        // import another service here
    };
    const methods = Object.keys(allMethods);
    methods.forEach(method => {
        inject(method, allMethods[method]);
    });
};

import Swal from "sweetalert2";

const swal = {
    async remove(label) {
        return await Swal.fire({
            title: "Are You Sure?",
            html:
                "You are about to delete <em><mark>" +
                label +
                "</mark></em>. <br><br> Type <strong>DELETE</strong> to confirm.",
            input: "text",
            showCancelButton: true,
            confirmButtonColor: "#ff8057",
            inputValidator: value => {
                if (!value || value !== "DELETE") {
                    return 'You need to enter "DELETE" to remove the record!';
                }
            }
        });
    }
};

export default swal;

import Swal from 'sweetalert2';

//Sweet Alert function for success message
export const successAlert = async (title) => {
    return await Swal.fire({
        text: title,
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        width: '416px',
        //height: '254px'
    });
}

//Sweet Alert function for error message
export const errorAlert = async (title) => {
    return await Swal.fire({
        text: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        width: '416px',
        //height: '254px'
    });
}

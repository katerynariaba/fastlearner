import { authHeader } from "../Helpers";

export const certificateService = {
    getCertificate
};

function getCertificate(courseId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=filename.pdf'
        },
    };

    return fetch(`https://localhost:44389/cerificate/${courseId}`, requestOptions);
}

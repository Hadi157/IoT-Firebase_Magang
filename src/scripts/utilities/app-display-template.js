/* eslint-disable no-unused-vars */
const alertTemplate = (kind, title, message, backdrop = false) => {
    let kindIcons;
    if (kind === "alert-success") {
        kindIcons = `<i class="bi bi-check-circle-fill me-2"></i>`;
    } else if (kind === "alert-danger") {
        kindIcons = `<i class="bi bi-exclamation-triangle-fill me-2"></i>`;
    } else {
        kindIcons = `<i class="bi bi-info-square-fill me-2"></i>`;
    }
    if (backdrop) {
        return `
        <div class="loading col d-flex align-items-center justify-content-center">
            <div>
                <div class="alert ${kind} fixed-top shadow-lg" role="alert" style="display: none">
                    <h4 class="alert-heading">${kindIcons} ${title}</h4>
                    <hr>
                    <p class="mb-0">${message}</p>
                </div>
            </div>
        </div>
        `;
    } else {
        return `
        <div class="alert ${kind} fixed-top shadow-lg" role="alert" style="display: none">
            <h4 class="alert-heading">${kindIcons} ${title}</h4>
            <hr>
            <p class="mb-0">${message}</p>
        </div>
        `;
    }
};
export { alertTemplate };

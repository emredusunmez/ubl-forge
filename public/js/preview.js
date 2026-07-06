function copyXml(elementId, button){

    const text = document.getElementById(elementId).innerText;

    navigator.clipboard.writeText(text).then(()=>{

        const oldText = button.innerHTML;

        button.innerHTML = "✅ Kopyalandı";

        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-success");

        setTimeout(()=>{

            button.innerHTML = oldText;

            button.classList.remove("btn-success");
            button.classList.add("btn-outline-primary");

        },2000);

    });

}
const csvPreview = document.getElementById("csvPreview");

const csvArrow = document.getElementById("csvArrow");

const csvFolder = document.getElementById("csvFolder");

csvPreview.addEventListener("show.bs.collapse", () => {

    csvArrow.classList.replace(
        "bi-chevron-right",
        "bi-chevron-down"
    );

    csvFolder.classList.replace(
        "bi-folder",
        "bi-folder2-open"
    );

});

csvPreview.addEventListener("hide.bs.collapse", () => {

    csvArrow.classList.replace(
        "bi-chevron-down",
        "bi-chevron-right"
    );

    csvFolder.classList.replace(
        "bi-folder2-open",
        "bi-folder"
    );

});

csvPreview.addEventListener("hide.bs.collapse", () => {

    csvArrow.classList.remove("bi-chevron-down");

    csvArrow.classList.add("bi-chevron-right");

});
document.querySelectorAll(".xml-toggle").forEach(button => {

    const target = document.querySelector(button.dataset.bsTarget);

    const icon = button.querySelector("i");

    const textNode = button.childNodes[button.childNodes.length - 1];

    target.addEventListener("show.bs.collapse", () => {

        icon.classList.replace(
            "bi-chevron-right",
            "bi-chevron-down"
        );

        textNode.textContent = " XML İçeriğini Gizle";

    });

    target.addEventListener("hide.bs.collapse", () => {

        icon.classList.replace(
            "bi-chevron-down",
            "bi-chevron-right"
        );

        textNode.textContent = " XML İçeriğini Göster";

    });

});
document.querySelectorAll("[id^='xmlCollapse-']").forEach(collapse => {

    const index = collapse.id.split("-")[1];

    const arrow = document.getElementById("headerArrow-" + index);

    collapse.addEventListener("show.bs.collapse", () => {

        arrow.classList.replace(
            "bi-chevron-right",
            "bi-chevron-down"
        );

    });

    collapse.addEventListener("hide.bs.collapse", () => {

        arrow.classList.replace(
            "bi-chevron-down",
            "bi-chevron-right"
        );

    });

});
const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".xml-card");

const visibleCount = document.getElementById("visibleCount");

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    let visible = 0;

    cards.forEach(card => {

        const fileName = card.dataset.fileName;

        if (fileName.includes(keyword)) {

            card.style.display = "";

            visible++;

        } else {

            card.style.display = "none";

        }

    });

    visibleCount.textContent = visible;

});
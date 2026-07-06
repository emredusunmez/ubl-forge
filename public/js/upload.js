
const input = document.getElementById("csvFile");

const browseBtn = document.getElementById("browseBtn");

const dropZone = document.getElementById("dropZone");

const uploadIcon = document.getElementById("uploadIcon");

const fileInfo = document.getElementById("fileInfo");

const fileName = document.getElementById("fileName");

const fileSize = document.getElementById("fileSize");



dropZone.addEventListener("click", (e) => {

    // Eğer gerçekten butona tıklandıysa burada ekstra işlem yapmaya gerek yok.
    input.click();

});

function updateFile(file){

    fileName.textContent = file.name;

    fileSize.textContent =
        (file.size/1024).toFixed(2)+" KB";

    fileInfo.classList.remove("d-none");

    uploadIcon.classList.remove(
        "bi-cloud-arrow-up",
        "text-primary"
    );

    uploadIcon.classList.add(
        "bi-check-circle-fill",
        "text-success"
    );

}

input.addEventListener("change", ()=>{

    if(input.files.length){

        updateFile(input.files[0]);

    }

});

dropZone.addEventListener("dragover",(e)=>{

    e.preventDefault();

    dropZone.classList.add(
        "border-primary",
        "bg-primary-subtle"
    );

});

dropZone.addEventListener("dragleave",()=>{

    dropZone.classList.remove(
        "border-primary",
        "bg-primary-subtle"
    );

});

dropZone.addEventListener("drop",(e)=>{

    e.preventDefault();

    dropZone.classList.remove(
        "border-primary",
        "bg-primary-subtle"
    );

    if(e.dataTransfer.files.length){

        input.files=e.dataTransfer.files;

        updateFile(input.files[0]);

    }

});
const uploadForm = document.getElementById("uploadForm");

const submitBtn = document.getElementById("submitBtn");

const btnContent = document.getElementById("btnContent");

const loadingOverlay = document.getElementById("loadingOverlay");
const loadingStep = document.getElementById("loadingStep");

const loadingProgress = document.getElementById("loadingProgress");

const steps = [

    {
        text:"📄 CSV okunuyor...",
        progress:20
    },

    {
        text:"🔍 Satırlar analiz ediliyor...",
        progress:45
    },

    {
        text:"⚙ XML oluşturuluyor...",
        progress:70
    },

    {
        text:"📦 Dosyalar hazırlanıyor...",
        progress:100
    }

];
uploadForm.addEventListener("submit", () => {
    

    submitBtn.disabled = true;

    btnContent.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        CSV İşleniyor...
    `;

    loadingOverlay.classList.remove("d-none");

    loadingOverlay.classList.add("d-flex");
    let i = 0;

loadingStep.innerHTML = steps[0].text;

loadingProgress.style.width = steps[0].progress + "%";

const interval = setInterval(() => {

    i++;

    if(i >= steps.length){

        clearInterval(interval);

        return;

    }

    loadingStep.innerHTML = steps[i].text;

    loadingProgress.style.width =
        steps[i].progress + "%";

},700);

});

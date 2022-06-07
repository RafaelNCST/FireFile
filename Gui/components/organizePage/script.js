const fs = window.efs
const path = window.epath 
const dirname = window.direBaseName.dirname;
const PythonShell = window.pythonRunScript.run;

document.getElementById("close-btn").addEventListener("click", _ => {
    app.window.closeBackIndex();
});

document.getElementById("minimize-btn").addEventListener("click", _ => {
    app.window.minimize();
});

const pickArchiveName = (archive) => {
    let inputDisplay = document.querySelector("#input-archive");
    let archiveSplit = archive.split("\\")
    archiveSplit.pop();
    let archiveFinal = archiveSplit.join("\\")

    inputDisplay.value = archiveFinal
}

const openModal = (erro) => {
    let modalWarning = document.getElementById("modalWarning")
    let modalText = document.querySelector(".modalBody")
    modalWarning.style.opacity = 1
    modalWarning.style.pointerEvents = "all"
    modalText.innerHTML = erro
}

const closeModal = () => {
    let modalWarning = document.getElementById("modalWarning")
    modalWarning.style.opacity = 0
    modalWarning.style.pointerEvents = "none"
    modalText.innerHTML = ""
}

const defineInputArchiveName = (archive) => {
    let nameFileRawSplit = archive.split("\\");
    nameFileRawSplit.pop()
    let nameFile = nameFileRawSplit.pop()

    document.getElementById("nome").value = `Name: ${nameFile}`
}

const defineInitialBodyInBlocked = () => {
    let bodyDivNewFile = document.querySelector(".body-initial-div");
    let infosAction = document.querySelector(".infos-action")
    if(infosAction){
        infosAction.style.display = "flex"
    }
    bodyDivNewFile.classList.add("body-initial-div-blocked");
}

const fileToReceive = evt => {
    let file = evt.target.files[0]
    sessionStorage.setItem("archive", file.path);
    let archive = sessionStorage.getItem("archive")

    if(archive){
        pickArchiveName(archive)
        defineInputArchiveName(archive)
        defineInitialBodyInBlocked()
    }
}

const observerDataExists = () => {
    let archive = sessionStorage.getItem("archive")
    if(archive){
        pickArchiveName(archive)
        defineInputArchiveName(archive)
        defineInitialBodyInBlocked()
    }
}

const loadingDisplay = () => {
    let sucess = document.querySelector(".sucess");
    let sucessImg = document.querySelector(".sucessImg");
    sucess.classList.add("sucessBar");
    sucessImg.style.opacity = 1;
    setTimeout( _ => {
        sucess.classList.remove("sucessBar");
        sucessImg.style.opacity = 0;
    },5000)
}

const convertHandle = () => {
    let archive = sessionStorage.getItem("archive")
    let archiveSplit = archive.split("\\")
    archiveSplit.pop()
    let archiveFinal = archiveSplit.join("\\")
    let arrowSpin = document.getElementById("arrowSpin")
    arrowSpin.classList.remove("sucessImg")
    arrowSpin.classList.add("spinner")

    let opcoes = {
        pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
        pythonOptions: ['-u'],
        scriptPath: window.epath.join(dirname,'../BackEnd'),
        args: [archiveFinal]
    }
    PythonShell('organizeArchive.py', opcoes, function (err, results){
        if(err){
            openModal(err)
        }else{
            arrowSpin.classList.remove("spinner")
            arrowSpin.classList.add("sucessImg")
            loadingDisplay()
        }
    });
}

let arrowSpin = document.getElementById("arrowSpin")

document.getElementById("buttonOrganize").addEventListener("click", convertHandle);

window.addEventListener("load", observerDataExists);

document.querySelector("#inputFileHtml").addEventListener("change", fileToReceive)
document.querySelector("#miniInputFile").addEventListener("change", fileToReceive)
document.getElementById("buttonOk").addEventListener("click", closeModal)
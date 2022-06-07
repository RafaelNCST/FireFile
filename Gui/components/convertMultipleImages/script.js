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
    let archiveSPlit = archive.split("\\")
    archiveSPlit.pop()
    let archiveFinal = archiveSPlit.join("\\")
    inputDisplay.value = archiveFinal

    return archiveFinal
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
    sessionStorage.setItem("dataImageMultiple", file.path);
    let archive = sessionStorage.getItem("dataImageMultiple")

    if(archive){
        pickArchiveName(archive)
        defineInputArchiveName(archive)
        defineInitialBodyInBlocked()
    }
}

const observerDataExists = () => {
    let archive = sessionStorage.getItem("dataImageMultiple")
    if(archive){
        pickArchiveName(archive)
        defineInputArchiveName(archive)
        defineInitialBodyInBlocked()
    }
}

window.addEventListener("load", observerDataExists);

document.querySelector("#inputFileHtml").addEventListener("change", fileToReceive)
document.querySelector("#miniInputFile").addEventListener("change", fileToReceive)

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

document.getElementById("extensions").addEventListener("change", _ => {
    let extInput1 = document.getElementById("extensions")
    let extInput2 = document.getElementById("inputTypeArchive")
    if(extInput1.value == ".png"){
        extInput2.value = ".jpeg"
    }else if(extInput1.value == ".jpeg"){
        extInput2.value = ".png"
    }
})

const convertButton = () => {
    let extInput1 = document.getElementById("extensions");
    let dataImageMultiple = sessionStorage.getItem("dataImageMultiple")
    let pathData = pickArchiveName(dataImageMultiple)
    let arrowSpin = document.getElementById("arrowSpin")
    arrowSpin.innerHTML = ""
    arrowSpin.classList.remove("arrow")
    arrowSpin.classList.add("spinner")
    if(extInput1.value == ""){
        openModal("Valor de entrada não pode ser vazio")
    }else{
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [pathData, extInput1.value]
        }
        PythonShell('convertImageMultiple.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.innerHTML = "➞"
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("arrow")
                loadingDisplay()
            }
        });
    } 
}

document.getElementById("buttonOk").addEventListener("click", closeModal)

document.getElementById("buttonConvert").addEventListener("click", convertButton)

window.addEventListener("load", observerDataExists);

document.querySelector("#inputFileHtml").addEventListener("change", fileToReceive)
document.querySelector("#miniInputFile").addEventListener("change", fileToReceive)
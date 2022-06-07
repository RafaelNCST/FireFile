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

const defineInputArchiveName = (data) => {
    let nameFile = path.basename(data);

    document.getElementById("nome").value = `Name: ${nameFile}`
}

const defineInputArchiveSize = (data) => {
    let size = document.getElementById("tamanho")

    sizeinBytes = fs.statSync(data).size
    sizeinMegaBytes = sizeinBytes / (1024*1024)

    const KB = sizeinBytes.toString().match(/^[0-9]{0,6}$/)
    const MB = sizeinBytes.toString().match(/^[0-9]{7,9}$/)

    if(KB){
        size.innerHTML = `Size: ${Math.trunc(sizeinBytes.toLocaleString("pt-BR"))} KB`
    }
    else if(MB){
        size.innerHTML = `Size: ${sizeinMegaBytes.toLocaleString("pt-BR")} MB`
    }
}

const defineInitialBodyInBlocked = () => {
    let bodyDivNewFile = document.querySelector(".body-initial-div");
    let infosAction = document.querySelector(".infos-action")
    if(infosAction){
        infosAction.style.display = "flex"
    }
    bodyDivNewFile.classList.add("body-initial-div-blocked");
}

const defineInputArchiveExt = (data) => {
    let extType = path.extname(data);
    let extInput1 = document.getElementById("inputTypeArchive")
    let extInput2 = document.getElementById("extensions")

    extInput1.value = extType
    
    if(extType == ".docx"){
        extInput2.value = ".pdf"
    }else if(extType == ".pdf"){
        extInput2.value = ".docx"
    }
}

const fileToReceive = evt => {
    let file = evt.target.files[0]
    sessionStorage.setItem("dataImage", file.path);
    let dataImage = sessionStorage.getItem("dataImage")
    let inputDisplay = document.querySelector("#input-archive");

    if(dataImage){
        inputDisplay.value = dataImage
        defineInputArchiveName(dataImage)
        defineInputArchiveSize(dataImage)
        defineInputArchiveExt(dataImage)
        observerInputs()
        observerPDFChoose()
        defineInitialBodyInBlocked()
    }
}

const observerDataExists = () => {
    let dataImage = sessionStorage.getItem("dataImage")
    let inputDisplay = document.querySelector("#input-archive");
    if(dataImage){
        inputDisplay.value = dataImage
        defineInputArchiveName(dataImage)
        defineInputArchiveSize(dataImage)
        defineInputArchiveExt(dataImage)
        observerInputs()
        observerPDFChoose()
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

const observerInputs = () => {
    let pdfInput = document.getElementById("pdf");
    let jpegInput = document.getElementById("jpeg");
    let pngInput = document.getElementById("png");
    let inputExt1 = document.getElementById("inputTypeArchive")
    let extInput2 = document.getElementById("extensions")
    extInput2.value = ""

    if(inputExt1.value == ".pdf"){
        pdfInput.setAttribute("hidden", "hidden")
        jpegInput.removeAttribute("hidden", "hidden")
        pngInput.removeAttribute("hidden", "hidden")
    }else if(inputExt1.value == ".png"){
        pngInput.setAttribute("hidden", "hidden")
        pdfInput.setAttribute("hidden", "hidden")
        jpegInput.removeAttribute("hidden", "hidden")
    }else if(inputExt1.value == ".jpeg" || inputExt1.value == ".jpg"){
        jpegInput.setAttribute("hidden", "hidden")
        pngInput.removeAttribute("hidden", "hidden")
        pdfInput.setAttribute("hidden", "hidden")
    }

}

const observerPDFChoose = () => {
    let numberPage = document.getElementById("numberPage")
    let extInput1 = document.getElementById("inputTypeArchive");

    if(extInput1.value == ".pdf"){
        numberPage.style.display = "block"
    }else{
        numberPage.style.display = "none"
    }
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
    let modalText = document.querySelector(".modalBody")
    modalWarning.style.opacity = 0
    modalWarning.style.pointerEvents = "none"
    modalText.innerHTML = ""
}


const convertButton = () => {
    let extInput1 = document.getElementById("inputTypeArchive");
    let extInput2 = document.getElementById("extensions")
    let dataImage = sessionStorage.getItem("dataImage")
    let arrowSpin = document.getElementById("arrowSpin")
    arrowSpin.innerHTML = ""
    arrowSpin.classList.remove("arrow")
    arrowSpin.classList.add("spinner")

    if(extInput2.value == ""){
        openModal("Entradas Vazias")
    }
    else if(extInput1.value == ".pdf"){
        let page = document.getElementById("inputPage")
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [dataImage, extInput2.value, page.value]
        }
        PythonShell('convertpdfToImage.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.innerHTML = "➞"
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("arrow")
                loadingDisplay()
            }
        });
    }else{
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [dataImage, extInput2.value]
        }
        PythonShell('convertImage.py', opcoes, function (err, results){
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

document.getElementById("buttonMultiple-Images").addEventListener("click", _ => app.window.multipleImages())

document.getElementById("buttonOk").addEventListener("click", closeModal)

document.getElementById("buttonConvert").addEventListener("click", convertButton)

window.addEventListener("load", observerDataExists);

document.querySelector("#inputFileHtml").addEventListener("change", fileToReceive)
document.querySelector("#miniInputFile").addEventListener("change", fileToReceive)
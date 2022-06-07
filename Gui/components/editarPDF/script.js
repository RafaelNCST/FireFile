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

    return nameFile
}

const defineInputArchiveSize = (data) => {

    let size1 = document.getElementById("size1")
    let size2 = document.getElementById("size2")

    sizeinBytes = fs.statSync(data).size
    sizeinMegaBytes = sizeinBytes / (1024*1024)

    const KB = sizeinBytes.toString().match(/^[0-9]{0,6}$/)
    const MB = sizeinBytes.toString().match(/^[0-9]{7,9}$/)

    size1.style.visibility = "visible"
    size2.style.visibility = "visible"

    if(KB){
        return `Size: ${Math.trunc(sizeinBytes.toLocaleString("pt-BR"))} KB`
    }
    else if(MB){
        return `Size: ${sizeinMegaBytes.toLocaleString("pt-BR")} MB`
    }

}

const fileToReceive = evt => {
    let inputFile1 = document.getElementById("inputFile1")
    let size1 = document.getElementById("size1")
    let file = evt.target.files[0]
    sessionStorage.setItem("dataPDF", file.path);
    let dataPDF = sessionStorage.getItem("dataPDF")

    if(dataPDF){
        let name = defineInputArchiveName(dataPDF)
        let size = defineInputArchiveSize(dataPDF)
        inputFile1.value = name
        size1.innerHTML = size
    }
}

const fileToReceive2 = evt => {
    let inputFile2 = document.getElementById("inputFile2")
    let size2 = document.getElementById("size2")
    let file = evt.target.files[0]
    sessionStorage.setItem("dataPDF2", file.path);
    let dataPDF2 = sessionStorage.getItem("dataPDF2")

    if(dataPDF2){
        let name = defineInputArchiveName(dataPDF2)
        let size = defineInputArchiveSize(dataPDF2)
        inputFile2.value = name
        size2.innerHTML = size
    }
}

const observerInput = () => {
    let select = document.getElementById("select")
    let inputUnico = document.getElementById("inputSingle")
    let inputs = document.getElementsByClassName("inputsPages")
    let inputFile2 = document.getElementById("inputFile2")
    let inputButton = document.getElementById("labelInputFile")

    if(select.value == "append"){
        for(let item of inputs){
            item.setAttribute("disabled", "disabled")
        }
        inputUnico.setAttribute("disabled", "disabled")
        inputButton.style.opacity = 1
        inputButton.style.pointerEvents = "all"
    }else if(select.value == "remove"){
        for(let item of inputs){
            item.setAttribute("disabled", "disabled")
        }
        inputUnico.removeAttribute("disabled", "disabled")
        inputFile2.value = ""
        inputButton.style.opacity = 0.5
        inputButton.style.pointerEvents = "none"
    }else if(select.value == "mergeNew"){
        for(let item of inputs){
            item.removeAttribute("disabled", "disabled")
        }
        inputUnico.setAttribute("disabled", "disabled")
        inputButton.style.opacity = 0.5
        inputButton.style.pointerEvents = "none"
    }else if(select.value == "cut"){
        for(let item of inputs){
            item.setAttribute("disabled", "disabled")
        }
        inputUnico.removeAttribute("disabled", "disabled")
        inputFile2.value = ""
        inputButton.style.opacity = 0.5
        inputButton.style.pointerEvents = "none"
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

const openModal = () => {
    let modalWarning = document.getElementById("modalWarning")
    modalWarning.style.opacity = 1
    modalWarning.style.pointerEvents = "all"
}

const closeModal = () => {
    let modalWarning = document.getElementById("modalWarning")
    modalWarning.style.opacity = 0
    modalWarning.style.pointerEvents = "none"
}


const editButton = () => {
    let select = document.getElementById("select");
    let inputRemoved = document.getElementById("inputSingle")
    let inputI = document.getElementById("inputI")
    let inputF = document.getElementById("inputF")
    let dataPDF = sessionStorage.getItem("dataPDF")
    let dataPDF2 = sessionStorage.getItem("dataPDF2")
    let arrowSpin = document.getElementById("arrowSpin")
    arrowSpin.classList.remove("sucessImg")
    arrowSpin.classList.add("spinner")

    if(select.value == "none"){
        openModal("Escolha uma opção")
    }else if(select.value == "append"){
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [dataPDF, dataPDF2]
        }
        PythonShell('pdfAppendAll.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("sucessImg")
                loadingDisplay()
            }
        });
    }else if(select.value == "remove"){
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [dataPDF, inputRemoved.value]
        }
        PythonShell('pdfRemove.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("sucessImg")
                loadingDisplay()
            }
        });
    }else if(select.value == "mergeNew"){
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [dataPDF, inputI.value, inputF.value]
        }
        PythonShell('pdfSeizing.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("sucessImg")
                loadingDisplay()
            }
        });
    }else if(select.value == "cut"){
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [dataPDF, inputRemoved.value]
        }
        PythonShell('pdfSplit.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("sucessImg")
                loadingDisplay()
            }
        });
    }
}

document.querySelector(".EditButton").addEventListener("click", editButton)

document.getElementById("select").addEventListener("change", observerInput)

document.querySelector("#miniInputFile1").addEventListener("change", fileToReceive)
document.querySelector("#miniInputFile2").addEventListener("change", fileToReceive2)

document.getElementById("buttonOk").addEventListener("click", closeModal)


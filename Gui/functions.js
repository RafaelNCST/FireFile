const fs = window.efs
const path = window.epath 

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
    sessionStorage.setItem("data", file.path);
    let data = sessionStorage.getItem("data")
    let inputDisplay = document.querySelector("#input-archive");

    if(data){
        inputDisplay.value = data
        defineInputArchiveName(data)
        defineInputArchiveSize(data)
        defineInputArchiveExt(data)
        defineInitialBodyInBlocked()
    }
}

const observerDataExists = () => {
    let data = sessionStorage.getItem("data")
    let inputDisplay = document.querySelector("#input-archive");
    if(data){
        inputDisplay.value = data
        defineInputArchiveName(data)
        defineInputArchiveSize(data)
        defineInputArchiveExt(data)
        defineInitialBodyInBlocked()
    }
}

window.addEventListener("load", observerDataExists);

document.querySelector("#inputFileHtml").addEventListener("change", fileToReceive)
document.querySelector("#miniInputFile").addEventListener("change", fileToReceive)


/* const refreshArchiveInfos = () => {
    let nome = document.getElementById("nome")
    let size = document.getElementById("tamanho")

    nome.value = `Name: ${path.basename(data)}`

    sizeinBytes = fs.statSync(data).size
    sizeinMegaBytes = sizeinBytes / (1024*1024)

    const KB = sizeinBytes.toString().match(/^[0-9]{0,6}$/)
    const MB = sizeinBytes.toString().match(/^[0-9]{7,9}$/)
    if (KB){
        size.innerHTML = `Size: ${sizeinBytes.toLocaleString("pt-BR")} KB`
    }
    else if (MB){
        size.innerHTML = `Size: ${sizeinBytes.toLocaleString("pt-BR")} MB`
    }
}


window.addEventListener("load", refreshArchiveInfos)

inputTextArchive.addEventListener("click", _ => {
    var filepath = app.window.archivewindow();
    filepath.then(result => {
        if(result){
            data = localStorage.removeItem("data");
            localStorage.setItem("data", result);
        }
        data = localStorage.getItem("data");
        inputTextArchive.value = data;
        refreshArchiveInfos();
        defineInputArchiveExt();
    })
}) */







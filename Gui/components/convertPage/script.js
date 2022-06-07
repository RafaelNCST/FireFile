const dirname = window.direBaseName.dirname;
const PythonShell = window.pythonRunScript.run;

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
    let modalText = document.querySelector(".modalBody")
    modalWarning.style.opacity = 0
    modalWarning.style.pointerEvents = "none"
    modalText.innerHTML = ""
}

function convertArchive(){
    let extInput1 = document.getElementById("inputTypeArchive")
    let extInput2 = document.getElementById("extensions")
    let data = sessionStorage.getItem("data")
    let arrowSpin = document.getElementById("arrowSpin")
    arrowSpin.innerHTML = ""
    arrowSpin.classList.remove("arrow")
    arrowSpin.classList.add("spinner")
    if(extInput1.value == ".pdf" && extInput2.value == ".docx"){
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [data]
        }
        PythonShell('convertPDFtoDocx.py', opcoes, function (err, results){
            if(err){
                openModal(err)
            }else{
                arrowSpin.innerHTML = "➞"
                arrowSpin.classList.remove("spinner")
                arrowSpin.classList.add("arrow")
                loadingDisplay()
            }
        });
    }else if(extInput1.value == ".docx" && extInput2.value == ".pdf"){
        let opcoes = {
            pythonPath: window.epath.join(dirname, '../BackEnd/Python310/python.exe'),
            pythonOptions: ['-u'],
            scriptPath: window.epath.join(dirname,'../BackEnd'),
            args: [data]
        }
        PythonShell('convertDocxtoPDF.py', opcoes, function (err, results){
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

document.querySelector(".Button-multiple").addEventListener("click", () => {
    app.window.multipleFiles();
})

document.getElementById("buttonOk").addEventListener("click", closeModal)

document.getElementById("buttonConvert").addEventListener("click", convertArchive)


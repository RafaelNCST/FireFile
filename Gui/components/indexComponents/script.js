
document.querySelector(".convertPage").addEventListener("click", _ => {
    app.window.converterPage();
})

document.querySelector(".convertImages").addEventListener("click", _ => {
    app.window.convertImages();
})

document.querySelector(".organizePage").addEventListener("click", _ => {
    app.window.organizarPage();
})

document.querySelector(".editarPDFs").addEventListener("click", _ => {
    app.window.editarPDFs();
})

document.querySelector(".quitApp").addEventListener("click", _ => {
    app.window.closeIndex();
})


from docx2pdf import convert
from pdf2docx import Converter
import sys
import os

archive = sys.argv[1]

os.chdir(archive)

for file in os.listdir():
    if file.endswith(".pdf"):
        pathName = archive+"\\"+file 
        cv = Converter(pathName)
        cv.convert(pathName.replace(".pdf", ".docx")) 
        cv.close()
    elif file.endswith(".docx"): 
        pathName = archive+"\\"+file 
        inputFile = pathName
        outputFile = pathName
        convert(inputFile, outputFile.replace(".docx", ".pdf")) 
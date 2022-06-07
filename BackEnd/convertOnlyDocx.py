import os
import sys
from docx2pdf import convert

archive = sys.argv[1]

os.chdir(archive)

for file in os.listdir():
    if file.endswith(".docx"): 
        pathName = archive+"\\"+file 
        inputFile = pathName
        outputFile = pathName
        convert(inputFile, outputFile.replace(".docx", ".pdf"))   
import os
import sys
from pdf2docx import Converter

archive = sys.argv[1]

os.chdir(archive)

for file in os.listdir():
    if file.endswith(".pdf"):
        pathName = archive+"\\"+file 
        cv = Converter(pathName)
        cv.convert(pathName.replace(".pdf", ".docx")) 
        cv.close()
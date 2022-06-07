from docx2pdf import convert
import sys

path = sys.argv[1]

inputFile = path
outputFile = path
convert(inputFile, outputFile.replace(".docx", ".pdf"))   
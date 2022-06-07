from pdf2docx import Converter
import sys

path = sys.argv[1]

cv = Converter(path)
cv.convert(path.replace(".pdf", ".docx")) 
cv.close()
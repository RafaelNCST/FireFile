import fitz
import sys

data = sys.argv[1]
ext = sys.argv[2]
page = sys.argv[3]

doc = fitz.open(data)
page = doc.load_page(int(page)-1)
matriz = fitz.Matrix(8, 8)
pix = page.get_pixmap(matrix=matriz)
outputSplit = str(data).split(".")
outputSplit.pop()
outputJoin = "".join(outputSplit)
output = outputJoin+ext
pix.save(output)
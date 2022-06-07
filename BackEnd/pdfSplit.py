import sys
from PyPDF3 import PdfFileMerger, PdfFileReader, PdfFileWriter

dataPDF = sys.argv[1]
page = sys.argv[2]

reader = PdfFileReader(open(dataPDF, "rb"))
writer1 = PdfFileWriter()
writer2 = PdfFileWriter()

itemSplit = dataPDF.split("\\")
itemSplit.pop()
pathFile = "\\".join(itemSplit)

for pag in range(0,int(page)-1):
    writer1.addPage(reader.getPage(pag))

for pag2 in range(int(page), reader.getNumPages()):
    writer2.addPage(reader.getPage(pag2))

with open(f"{pathFile}\\FireFile - Part1.pdf", "wb") as file1:
    writer1.write(file1)

with open(f"{pathFile}\\FireFile - Part2.pdf", "wb") as file2:
    writer2.write(file2)
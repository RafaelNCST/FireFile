import sys
from PyPDF3 import PdfFileMerger, PdfFileReader, PdfFileWriter

dataPDF = sys.argv[1]
pagremoved = sys.argv[2]

reader = PdfFileReader(open(dataPDF, "rb"))
merger = PdfFileMerger()
item = open(dataPDF, "rb")
itemSplit = dataPDF.split("\\")
itemSplit.pop()
pathFile = "\\".join(itemSplit)
merger.append(fileobj = item, pages=(0, int(pagremoved)-1))
merger.append(fileobj = item, pages=(int(pagremoved), reader.getNumPages()))

output = open(f"{pathFile}\\FireFile - Remove.pdf", "wb")
merger.write(output)
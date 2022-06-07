import sys 
from PyPDF3 import PdfFileMerger, PdfFileReader, PdfFileWriter

dataPDF = sys.argv[1]
pi = sys.argv[2]
pf = sys.argv[3]

merger = PdfFileMerger()
item = open(dataPDF, "rb")
merger.append(fileobj = item, pages = (int(pi)-1,int(pf)+1))
itemSplit = dataPDF.split("\\")
itemSplit.pop()
pathFile = "\\".join(itemSplit)

output = open(f"{pathFile}\\FireFile - Seizing.pdf", "wb")
merger.write(output)
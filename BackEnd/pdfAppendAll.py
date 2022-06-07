from PyPDF3 import PdfFileMerger
import sys

dataPDF1 = sys.argv[1]
dataPDF2 = sys.argv[2]

merger = PdfFileMerger()
itemSplit = dataPDF1.split("\\")
itemSplit.pop()
pathFile = "\\".join(itemSplit)
arq = open(dataPDF1, "rb")
merger.append(arq)
arq2 = open(dataPDF2, "rb")
merger.append(arq2)
output = open(f"{pathFile}\\FireFire - Append.pdf", "wb");
merger.write(output)
arq.close()
arq2.close()
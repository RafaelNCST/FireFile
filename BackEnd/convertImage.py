import sys
from PIL import Image 

data = sys.argv[1]
inputValue = sys.argv[2]

namePath = data.split("\\")
lastPop = namePath.pop()
lastPopSplit = lastPop.split(".")
extension = lastPopSplit.pop()
nameFile = "".join(lastPopSplit)
pathFinal = "\\".join(namePath)
outPut = pathFinal+"\\"+nameFile

if extension == "png":
    img = Image.open(data)
    rgb_im = img.convert('RGB')
    rgb_im.save(outPut+inputValue)
else:
    img = Image.open(data)
    img.save(outPut+inputValue)
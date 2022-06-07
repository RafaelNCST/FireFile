import os
import sys
from PIL import Image 

data = sys.argv[1]
inputValue = sys.argv[2]

os.chdir(data)
    
for file in os.listdir():
    fileSplit = file.split(".")
    fileSplit.pop()
    fileFinal = "".join(fileSplit)
    pathFinal = data+"\\"+fileFinal

    if(inputValue == ".png"):
        img = Image.open(file)
        rgb_im = img.convert('RGB')
        rgb_im.save(pathFinal+".jpeg")
        print("DE png Para JPEG")
    elif(inputValue == ".jpeg"):
        img = Image.open(file)
        img.save(pathFinal+".png")
        print("DE jpeg Para PNG")
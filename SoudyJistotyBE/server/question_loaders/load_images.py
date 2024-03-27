#Importing the modules
import openpyxl
from openpyxl_image_loader import SheetImageLoader

#loading the Excel File and the sheet
pxl_doc = openpyxl.load_workbook('pictures.xlsx')
sheet = pxl_doc['Sheet1']

#calling the image_loader
image_loader = SheetImageLoader(sheet)

#get the image (put the cell you need instead of 'A1')
image = image_loader.get('B2')

#showing the image
image.show()

#saving the image
image.save('my_path/image_name.jpg')
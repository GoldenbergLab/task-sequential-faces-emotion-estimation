from PIL import Image, ImageOps
import os

# listing all files
current_path = os.getcwd()
file_location = os.path.join(current_path) # exact location of basefile

for file in os.listdir(file_location):
	if file.endswith(".jpg"):
		image_name = file
		image_dir = os.path.join(file_location, file)
		ImageOps.expand(Image.open(image_dir),border=5,fill='red').save(image_name)


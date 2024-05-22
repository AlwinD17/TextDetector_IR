import pytesseract as tess
from PIL import Image
import cv2

def ResizeWithAspectRatio(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]
    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))
    return cv2.resize(image, dim, interpolation=inter)

tess.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
imagen = cv2.imread(r'C:\Users\eduda\workspace\TextDetector\textD_Api\detectionApi\prueba.jpg',cv2.IMREAD_IGNORE_ORIENTATION)
txt = tess.image_to_string(imagen)
print(txt)

resized = ResizeWithAspectRatio(imagen, width=720) 
cv2.imshow('resize', resized)
cv2.waitKey(0)
cv2.destroyAllWindows()

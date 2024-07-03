import pytesseract as tess
import PIL
import cv2
import numpy as np
import imutils

tess.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def puntos_rec(pts):
    rect = np.zeros((4, 2), dtype='float32')
    suma = pts.sum(axis=1)
    resta = np.diff(pts, axis=1)
    rect[0] = pts[np.argmin(suma)]
    rect[1] = pts[np.argmin(resta)]
    rect[2] = pts[np.argmax(suma)]
    rect[3] = pts[np.argmax(resta)]
    return rect

def transform(image, pts):
    rect = puntos_rec(pts)
    (tl, tr, br, bl) = rect

    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))

    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))

    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")

    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))

    return warped

def detect_text(input_image, mode, languages):

    image = cv2.imread(input_image)

    if mode:
        copia = image.copy()
        radio = image.shape[0] / 500.0
        image = imutils.resize(image, height=500)

        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blur_image = cv2.GaussianBlur(gray_image, (5, 5), 0)
        ret3, th3 = cv2.threshold(blur_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        cnts = cv2.findContours(th3.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:5]

        screenCnt = None
        for c in cnts:
            peri = cv2.arcLength(c, True)
            aprox = cv2.approxPolyDP(c, 0.02 * peri, True)
            if len(aprox) == 4:
                screenCnt = aprox
                break

        if screenCnt is not None:
            warped = transform(copia, screenCnt.reshape(4, 2) * radio)
            gray_image = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)
        else:
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    if np.mean(gray_image) < 128:
        gray_image = cv2.bitwise_not(gray_image)

    ret, binary_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    im_pil = PIL.Image.fromarray(binary_image)

    tessConfig = f'--psm 1 --oem 3 -l {languages}'
    text = tess.image_to_string(im_pil, config=tessConfig)

    return text
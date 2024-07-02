import { useRef, useState } from "react";

export const ImageUploader = () => {
    const [image, setImage] = useState("");
    const [error, setError] = useState(""); // Asegúrate de que setError esté definido
    const inputRef = useRef(null);

    // Maneja el clic en el div para abrir el selector de archivos
    const handleImageClick = () => {
        inputRef.current.click();
    };

    // Maneja el cambio en el selector de archivos
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        // Validar que el archivo sea una imagen
        const validImageTypes = [
            "image/jpeg",   // JPG, JPEG
            "image/png",    // PNG
            "image/webp",   // WEBP
        ];

        // Tamaño máximo del archivo
        const maxSize = 5 * 1024 * 1024; // 5 MB

        // Validaciones
        if (file) {
            if (validImageTypes.includes(file.type) && file.size <= maxSize) {
                setImage(file);
                setError("");
            } else if (file.size > maxSize) {
                setError("El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.");
            } else {
                setError("Por favor, selecciona una imagen válida (JPG, JPEG, PNG, WEBP).");
            }
        } else {
            setError("No se ha seleccionado ningún archivo.");
        }
    };

    const handleRemoveImage = () => {
        setImage("");
        setError("");
    };

    return (
        <div className="w-full max-w-xl px-10 py-8 mx-auto my-4 rounded-lg shadow-xl dark:bg-darkSecundaryBg">
            <div onClick={handleImageClick} className="cursor-pointer">
                {image ? (
                    <div className="relative">
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Imagen seleccionada"
                        className="w-full h-auto rounded-md"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                        X
                    </button>
                </div>
                ) : (
                    <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white dark:bg-darkSecundaryBg rounded-lg shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Selecciona una imagen de tu dispositivo para analizar
                        </h3>
                    </div>
                )}
                {error && (
                    <p className="mt-2 text-red-500">{error}</p>
                )}
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
            <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-accent rounded-md hover:bg-accentHover focus:outline-none focus:ring focus:ring-focusRing focus:ring-opacity-80"
                disabled={!image}
            >
                Analizar imagen
            </button>
        </div>
    );
};
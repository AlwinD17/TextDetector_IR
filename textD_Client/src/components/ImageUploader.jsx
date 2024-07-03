import { useRef, useState } from "react";
import { MultiSelect } from "@components";
import Switch from 'react-switch';
import axios from 'axios'

export const ImageUploader = ({ setResponseText, setResponseAudio }) => {
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [mode, setMode] = useState(false)
    const inputRef = useRef(null);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const languages = [
        { code: 'deu', label: 'Alemán' },
        { code: 'ara', label: 'Árabe' },
        { code: 'chi_sim', label: 'Chino' },
        { code: 'kor', label: 'Coreano' },
        { code: 'spa', label: 'Español' },
        { code: 'fra', label: 'Francés' },
        { code: 'eng', label: 'Inglés' },
        { code: 'ita', label: 'Italiano' },
        { code: 'jpn', label: 'Japonés' },
        { code: 'por', label: 'Portugués' },
        { code: 'rus', label: 'Ruso' },
    ];

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleChangeMode = () => {
        setMode( mode ? false : true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];


        const validImageTypes = [
            "image/jpeg",   // JPG, JPEG
            "image/png",    // PNG
            "image/webp",   // WEBP
        ];


        const maxSize = 5 * 1024 * 1024;


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

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("mode", mode);

        const languageCodes = selectedLanguages.length > 0
            ? selectedLanguages.join('+')
            : languages.map(lang => lang.code).join('+');

        formData.append("languages", languageCodes);

        try {
            const response = await axios.post("http://127.0.0.1:8000/detectionApi/posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const { imageText, audioFile } = response.data;
            const audioBlob = new Blob([new Uint8Array(atob(audioFile).split("").map(char => char.charCodeAt(0)))], { type: 'audio/mpeg' });

            setResponseText(imageText);
            setResponseAudio(URL.createObjectURL(audioBlob));
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            setError("Error al subir la imagen. Inténtalo de nuevo.");
        }
    };

    return (
        
            <div className="flex flex-col lg:flex-row  min-h-86 w-full max-w-xl mx-auto">
                <div className="flex flex-row lg:flex-col px-10 py-8 my-4 rounded-lg shadow-xl dark:bg-darkSecundaryBg">
                    <h5 className="font-poppins  text-black dark:text-white sm:mr-4 lg:mr-0 lg:mb-3" >Modo Foto (experimental): </h5>
                    <Switch 
                        onChange={handleChangeMode}
                        checked={mode}
                        offColor="#bbb"
                        onColor="#3296BE"
                        offHandleColor="#fff"
                        onHandleColor="#fff"
                        uncheckedIcon={false}
                        checkedIcon={false}
                    />
                    <MultiSelect
                            options={languages}
                            selectedOptions={selectedLanguages}
                            onChange={setSelectedLanguages}
                        />
                </div>

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
                        onClick={handleSubmit}
                        className="block w-full px-4 py-2 mt-4 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-accent rounded-md hover:bg-accentHover focus:outline-none focus:ring focus:ring-focusRing focus:ring-opacity-80"
                        disabled={!image}
                    >
                        Analizar imagen
                    </button>
                </div>
            </div>

        
    );
};
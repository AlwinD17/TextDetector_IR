import {
  ImageUploader,
  Header,
  Footer,
  CopyableText,
  Hero,
  Card,
  TranslatorPanel,
  
} from "@components";
import { useState } from "react";

function App() {

  const [responseText, setResponseText] = useState("");
  const [responseAudio, setResponseAudio] = useState();





  const info = [
    {
      paso: '1. Seleccione una imagen',
      descripcion: 'Haga clic dentro del recuadro blanco y seleccione una imagen legible desde su dispositivo.'
    },
    {
      paso: '2. Suba la imagen',
      descripcion: 'Seleccione el modo y los idiomas a analizar, luego haga clic en "Analizar Imagen" y espere los resultados.'
    },
    {
      paso: '3. Pruebe las distintas opciones',
      descripcion: 'Explore las opciones disponibles, como lectura en voz alta, copiado rápido y traducción.'
    }
  ];



  const [isTranslatorMode, setIsTranslatorMode] = useState(false);

  const handleToggle = () => setIsTranslatorMode(prevMode => !prevMode);

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#F2F2F2] to-[#E0E0E0] dark:from-[#1D1D1E] dark:to-[#101011] shadow-lg dark:shadow-[#101011] ">
        <Header />
        <Hero />
        <div id='features' className="pt-20 pb-12 bg-gradient-to-r from-[#F2F2F2] to-[#E0E0E0] dark:from-[#1D1D1E] dark:to-[#101011] shadow-md dark:shadow-[#101011] rounded-lg text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black dark:text-white">
            Extrae tu texto ahora
          </h1>
          <h6 className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            Sigue las instrucciones para extraer tu texto.
          </h6>
        </div>
        <div className="container min-h-screen mx-auto">
          <div className="lg:grid sm:flex sm:flex-col gap-8 px-10 py-8 mx-auto my-4 rounded-lg shadow-xl dark:bg-darkSecundaryBg sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {info.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
          <div className="text-center py-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black dark:text-white">
              ¡Listo para comenzar?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Sube una imagen para extraer el texto y descubre lo que puedes hacer con él.
            </p>
          </div>
          <ImageUploader setResponseText={setResponseText} setResponseAudio={setResponseAudio} />
          

            {responseText && (
              <>
              <div className="w-full max-w-fit px-10 py-8 mx-auto my-4 rounded-lg shadow-xl dark:bg-darkSecundaryBg">
                <div className="flex items-center">
                  <button
                    onClick={handleToggle}
                    className={`px-4 py-2 text-white rounded-md transition-colors duration-300 ${isTranslatorMode
                        ? "bg-accent hover:bg-accentHover"
                        : "bg-gray-600 hover:bg-gray-700 mb-4"
                      }`}
                  >
                    {isTranslatorMode ? "Modo Traductor" : "Modo Lectura"}
                  </button>
                </div>

                {isTranslatorMode ? (
                  <TranslatorPanel sourceText={responseText} sourceAudio={responseAudio}/>
                ) : (
                  <CopyableText text={responseText} audio={responseAudio}/>
                )}
                </div>
              </>
            )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

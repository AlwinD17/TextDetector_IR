export const Hero = () => {
    return (
        <>
            <section className=" pt-16 pb-24 flex items-center min-h-screen justify-center bg-gradient-to-r from-[#F2F2F2] to-[#E0E0E0] dark:from-[#1D1D1E] dark:to-[#101011] ">
                <div className="mx-auto px-5 py-32 sm:max-w-[36rem] md:max-w-[48rem] bg-white rounded-lg shadow-xl dark:bg-darkSecundaryBg ">
                    <div className="text-center">
                        <p className="text-lg font-medium leading-8 text-accent">Presentamos TextDetector</p>
                        <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black dark:text-white">
                            Extrae, traduce y escucha texto de&nbsp;imágenes
                        </h1>
                        <p className="mt-3 text-lg leading-relaxed text-slate-400">
                            TextDetector te permite analizar cualquier imagen para obtener texto, ofreciéndote opciones para copiarlo, traducirlo o incluso escucharlo en voz alta. Facilita tu acceso a la información contenida en imágenes.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <a href="#features"
                        className="block px-5 py-3 font-medium rounded-md tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-accent rounded-md hover:bg-accentHover focus:outline-none focus:ring focus:ring-focusRing focus:ring-opacity-80">Comencemos</a>
                    </div>
                </div>
            </section>
        </>
    )
}


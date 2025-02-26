import '../assets/styles/ctaButton.css';
export default function CtaButton() {
    return (
        <a className='flex justify-stretch items-center h-fit relative overflow-hidden heroCta border-2 border-[#56f9f9]'
           rel="noopener" href="https://bim-viewer-fe.whitebay-df079d67.westeurope.azurecontainerapps.io/">
            <span className='buttonDecorator'></span>
            <span className="buttonBg"></span>
            <div
                className="logoContainer bg-[length:60%] bg-no-repeat bg-center bg-[url('/logo.png')] bg-[#000] w-24 h-[60px]  z-10"></div>
            <button className='p-4 text-xl uppercase font-bold h-fit text-black z-10'>Provalo subito &#8599;</button>
        </a>
    );
}

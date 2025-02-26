import '../assets/styles/header.css';
import CtaButton from './ctaButton';
export const Header = () => {

    return (
        <div className="header">
            <img className='logo' src='/img/orbyta_logo_rettangolare-01.webp' alt="Logo Orbyta" />
            <div className="flex justify-end my-10 ml-10" id='ctaContainer'>
                <CtaButton></CtaButton>
            </div>
        </div>
    );
};
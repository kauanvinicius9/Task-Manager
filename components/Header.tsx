import Image from "next/image";
import gradient from "../assets/bosch_gradient.png";
import logo_red from "../assets/Bosch_symbol_logo_black_red.png";

export default function Header() {
    return (
        <header className="bg-white shadow-md w-full">
            <div className="w-full">
                <Image src={gradient} alt="Gradiente" className="w-full h-2 object-cover"/>
    
                <div className="flex items-center h-16 w-40 px-4">
                    <Image src={logo_red} alt="Logo" className="h-20 w-90 object-contain"/>
                </div>
            </div>
        </header>
    );
}
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Home(){
    return(
        <body>
            <Navbar type='home'/>
            <Footer/>
        </body>
    );
}
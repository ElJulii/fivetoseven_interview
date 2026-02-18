import Logo from "../../logo-white.png"

export default function Footer() {


    return (
        <footer>
            <div>
                <img className="footer__logo" src={Logo}></img>
            </div>
            <div style={{flexGrow: "2", flexBasis:"500px" }}>
                <h3>
                    КРЕАТИВНОЕ АГЕНСТВО 500NA700
                </h3>
            </div>
        </footer>
    )
}
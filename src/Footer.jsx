import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="socials">
                <a href="https://www.instagram.com/j_mogo/" target="_blank">
                    <button>
                        <span className="icon instagram"></span>
                    </button>
                </a>
                <a href="https://github.com/jm-mogo" target="_blanck">
                    <button>
                        <span className="icon github"></span>
                    </button>
                </a>
            </div>
            <div className="copyright">
                &#169; 2024 jm-mogo <br /> All Rights Reserved{" "}
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react'
import './footer.css'

const footer = () => {
    return (
        <>

            <footer>
                <p>Pagina realizada por el alumno Gaston Cazaubon. Adjunto datos de contacto.</p>


                <div className="contact">
                    <div className="contactCard"><i className="fa-solid fa-comment"></i>&nbsp;<a href="https://wa.me/1163538689" target="_blank">Whatsapp</a></div>
                    <div className="contactCard"><i className="fa-solid fa-phone"></i>&nbsp;<a href="tel:+5491163538689">Phone</a>
                    </div>
                    <div className="contactCard"><i className="fa-solid fa-envelope">&nbsp;</i><a
                        href="mailto:gastoncazaubon@gmail.com?subject=Consulta Web?body=Te escribo porque te vi en la web">Email</a>
                    </div>
                    <div className="contactCard"><i className="fa-solid fa-globe">&nbsp;</i><a href="https://www.linkedin.com/in/gaston-cazaubon/" target="_blank">LinkedIn</a>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default footer
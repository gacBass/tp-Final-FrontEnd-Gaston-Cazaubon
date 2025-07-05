import React from 'react'
import './footer.css'

const footer = () => {
    return (
        <>

            <footer>
                <p>Pagina realizada por el alumno Gaston Cazaubon. Adjunto datos de contacto.</p>


                <div class="contact">
                    <div class="contactCard"><i class="fa-solid fa-comment"></i>&nbsp;<a href="https://wa.me/1163538689" target="_blank">whatsap</a></div>
                    <div class="contactCard"><i class="fa-solid fa-phone"></i>&nbsp;<a href="tel:+5491163538689">phone</a>
                    </div>
                    <div class="contactCard"><i class="fa-solid fa-envelope">&nbsp;</i><a
                        href="mailto:gastoncazaubon@gmail.com?subject=Consulta Web?body=Te escribo porque te vi en la web">email</a>
                    </div>
                    <div class="contactCard"><i class="fa-solid fa-globe">&nbsp;</i><a href="https://www.linkedin.com/in/gaston-cazaubon/" target="_blank">linkedin</a>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default footer
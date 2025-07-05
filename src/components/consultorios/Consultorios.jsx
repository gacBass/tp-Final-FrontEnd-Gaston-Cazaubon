import React from 'react'
import './consultorios.css'

const Consultorios = () => {
  return (
    <>
      <div className="consultoriosText">
        <h1>Aqui podrás encontrarnos</h1>
        <h3>Direccion: Marcelo T de Alvear 2142</h3>
        <h3>Ciudad: Ciudad de Buenos Aires</h3>
        <h3>Telefono: (011) 4443-2994</h3></div>
        <div className="ubicacion">
          <div>

            <iframe class='iframe' src="https://www.google.com/maps/embed?pb=!4v1745774165013!6m8!1m7!1sWhk593VVKn3kmzF_B1AMeA!2m2!1d-34.5995820944796!2d-58.40016363277674!3f13.259429!4f0!5f0.7820865974627469" style={{ allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }} />
          </div>
          <div>
            <iframe class="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.2709769929374!2d-58.400812523531215!3d-34.597308757160995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca94262a1f8b%3A0xcdeeb398701e08a4!2sFacultad%20de%20Odontolog%C3%ADa.%20Hospital%20Odontolog%C3%ADa%20Universitario!5e0!3m2!1ses-419!2sar!4v1745549683317!5m2!1ses-419!2sar"
              style={{
                allowfullscreen: "", loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade"
              }} />
          </div>
        </div>

    </>
  )
}

export default Consultorios
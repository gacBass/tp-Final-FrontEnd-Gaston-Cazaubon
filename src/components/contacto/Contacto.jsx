import React from 'react'
import './contacto.css'

const Contacto = () => {
    return (
        <>
            <div className="contacto">
                <h1>Dejanos tus datos para poder contactarte!</h1>

                <div className="container">
                    <form action="#">
                        <h3> <label htmlFor="fname">Nombre:</label></h3>
                        <input type="text" id="fname" name="firstname" placeholder="Your name.." required />

                        <h3> <label htmlFor="lname">Apellido:</label></h3>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.." required />

                        <h3> <label htmlFor="lname">Email:</label></h3>
                        <input type="email" id="email" placeholder="Ingresa tu email" required />

                        <h3> <label htmlFor="genderSelect">Seleccione sexo:</label></h3>
                        <div className='radio'>
                            <input type="radio" id="Masculino" name="gender" value="Masculino" />
                            <label htmlFor="Masculino">Masculino</label>
                            <input type="radio" id="Femenino" name="gender" value="Femenino" />
                            <label htmlFor="Femenino">Femenino</label>
                        </div>
                        <hr />
                        <h3> <label htmlFor="country">Ciudad:</label></h3>
                        <select id="country" name="country">
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="La plata">La plata</option>
                            <option value="Resto del pais">Resto del pais</option>
                        </select>

                        <h3> <label htmlFor="subject">Dejanos tu consulta:</label></h3>
                        <textarea id="subject" name="subject" placeholder="Escribinos acá tu consulta..."
                            required></textarea>
                        <input type="submit" value="Enviar consulta" />&nbsp;&nbsp;
                        <input type="reset" value="Limpiar seleccion" />
                    </form>
                </div>
            </div>


        </>
    )
}

export default Contacto
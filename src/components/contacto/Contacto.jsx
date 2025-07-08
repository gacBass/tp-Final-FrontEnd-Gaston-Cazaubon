import React, { useState } from 'react'
import './contacto.css'


const Contacto = () => {


    const [name, setName] = useState("");
    const [lastName, setLastNAme] = useState("");
    const [email, setEmail] = useState("");
    const [city, setcity] = useState("");
    const [query, setQuery] = useState("");

    const handleModalWithData = () => {

        return (

            alert("Hello! " + " " + name + " " + lastName + ". We will send the information to your email " + email + ". We understand you live in " + city + ". This is your message: " + query + ", someone from support will contact you soon, thanks!")

        )


    }


    return (
        <>
            <div className="contacto">
                <h1>Dejanos tus datos para poder contactarte!</h1>

                <div className="container">
                    <form>
                        <h3> <label htmlFor="fname">Nombre:</label></h3>
                        <input type="text" id="fname" name="firstname" placeholder="Your name.." required onChange={(event) => setName(event.target.value)} />

                        <h3> <label htmlFor="lname" >Apellido:</label></h3>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.." required onChange={(event) => setLastNAme(event.target.value)} />

                        <h3> <label htmlFor="lname">Email:</label></h3>
                        <input type="email" id="email" placeholder="Ingresa tu email" required onChange={(event) => setEmail(event.target.value)} />

                        <h3> <label htmlFor="genderSelect">Seleccione sexo:</label></h3>
                        <div className='radio'>
                            <input type="radio" id="Masculino" name="gender" value="Masculino" />
                            <label htmlFor="Masculino">Masculino</label>
                            <input type="radio" id="Femenino" name="gender" value="Femenino" />
                            <label htmlFor="Femenino">Femenino</label>
                        </div>
                        <hr />
                        <h3> <label htmlFor="country">Ciudad:</label></h3>
                        <select id="country" name="country" required onChange={(event) => setcity(event.target.value)}>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="La plata">La plata</option>
                            <option value="Resto del pais">Resto del pais</option>
                        </select>

                        <h3> <label htmlFor="subject">Dejanos tu consulta:</label></h3>
                        <textarea id="subject" name="subject" placeholder="Escribinos acá tu consulta..."
                            required onChange={(event) => setQuery(event.target.value)}></textarea>
                        <input type="submit" value="Enviar consulta" onClick={handleModalWithData} />&nbsp;&nbsp;
                        <input type="reset" value="Limpiar seleccion" />
                    </form>
                </div>
            </div>


        </>
    )
}

export default Contacto
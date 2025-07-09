import React from 'react';
import '../../styles/galeria.css'; 
const Galeria = () => {
    return (
        <>
                <article>
                    <h1>Galeria de Casos</h1>
                    <div id="carouselExampleCaptions" className="carousel slide galeria"> {/* Changed class to className */}
                        <div className="carousel-indicators"> {/* Changed class to className */}
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                                aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                                aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
                                aria-label="Slide 5"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5"
                                aria-label="Slide 6"></button>
                        </div>
                        <div className="carousel-inner"> {/* Changed class to className */}
                            <div className="carousel-item active"> {/* Changed class to className */}
                                <img src="/galeria/5.jpg"
                                    className="d-block w-100" alt="image" /> {/* Changed class to className */}
                                <div className="carousel-caption d-none d-md-block"> {/* Changed class to className */}
                                    <h5>Paciente Aguilar</h5>
                                    <p>La paciente presentaba un cuadro de nariz de aguila, que fue reparado con mucha
                                        paciencia.
                                    </p>
                                </div>
                            </div>
                            {/* ... other carousel items, ensure className for all ... */}
                            <div className="carousel-item">
                                <img src="/galeria/1.jpg" className="d-block w-100" alt="image 1" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Paciente con nariz hinchada</h5>
                                    <p>A la paciente se le hizo una cirugia programada para reparar un accidente.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="/galeria/2.jpg"
                                    className="d-block w-100" alt="image 2" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Paciente Nassuti</h5>
                                    <p>Se hizo lo que se pudo durante una emergencia.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="/galeria/3.jpg"
                                    className="d-block w-100" alt="image 2" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Paciente Rodriguez</h5>
                                    <p>Rotura tabique durante pelea, cirugia de 8hs.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="/galeria/4.jpg" className="d-block w-100"
                                    alt="image 2" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Paciente Gimenez</h5>
                                    <p>Nariz y papada, service full.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="/galeria/6.jpg" className="d-block w-100"
                                    alt="image 2" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Paciente Gonzales Rodriguez</h5>
                                    <p>Joven con operacion realizada por estetica.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </article>
        </>
    )
}

export default Galeria;
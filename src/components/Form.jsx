import { useEffect, useState } from "react";
import loader from '../assets/loader.gif'

import { useNavigate } from "react-router-dom";

function Form({ type, textButton }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const register = () => {

        setLoading(true);

        const dataForm = {
            email,
            password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        };

        const response = fetch(`https://node-apirest-auth-user-production.up.railway.app/auth/${type}`, requestOptions);
        response.then(response => response.json())
            .then(info => {
                console.log(info)
                if (info.error) {
                    setData(null);
                    setError(info);
                }else{
                    setError(null);
                    setData(info);
                    const { token } = info
                    localStorage.setItem('token', token)
                    navigate("/users");
                }
                
            })
            .catch((error) => {
                setData(null);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }

    const restartValues = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        restartValues()
    }, [type])

    const captureInput = (e) => {
        const value = e.target.value
        const typeInput = e.target.name
        if (typeInput === 'email') {
            setEmail(value)
        }

        if (typeInput === 'password') {
            setPassword(value)
        }

    }

    const hidePopupError = () => {
        setError(null)
    }

    if (loading) {
        return (
            <div className="container-loader">
                <img src={loader} alt="loader" />
                <p className="text-loader"> Cargando...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container-error-popup">
                <p className="title-popup-error">Ha ocurrido un error</p>
                <div className="content-popup-error">
                    {error.message}
                </div>
                <button onClick={hidePopupError} className="button-close-error">Aceptar</button>
            </div>
        )
    }

    return (
        <div className="container-form">
            <p className="title-form">{type === 'login' ? 'Iniciar Sesion' : 'Registrarse'}</p>
            <div className="item-form-container">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={captureInput} />
            </div>

            <div className="item-form-container">
                <label htmlFor="email">Password</label>
                <input type="text" id="email" name="password" onChange={captureInput} />
            </div>
            <button className="btn-form" onClick={register}>{textButton}</button>
        </div>
    )
}

export default Form
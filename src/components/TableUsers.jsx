import { useEffect, useState} from "react"
import usuario from '../assets/usuario.png'
import loader from '../assets/loader.gif'
import { useNavigate } from "react-router-dom";

function TableUsers() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect( ()=> {
     
        fetch('https://node-apirest-auth-user-production.up.railway.app/users',{
          headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer '+localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        .then(resp => {
          if (resp.error) {
            setData(null);
            setError(resp);
          }else{
            setError(null);
            setData(resp);
          }
            
        })
        .catch(error => {
            setData(null);
            setError(error);
        })
        .finally( () => {
          setLoading(false);
        })
    },[])

    const hidePopupError = () => {
      setError(null)
      navigate("/login");
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
 
 const users =  data.users.map( (item,index) => {
     return (
      <tr key={index}>
      <td> {item.id}</td>
      <td><img src={usuario} alt=""/> {item.nombre} </td>
      <td>{item.email}</td>
      <td>
       <p className="status delivered">Editar</p>  
       <p className="status cancelled">Eliminar</p> 
         
      </td>
  </tr>
     )
    })
   
   return (
    <section className="table__body">
            <table>
                <thead>
                    <tr>
                        <th> Id <span className="icon-arrow"></span></th>
                        <th> Nombre <span className="icon-arrow"></span></th>
                        <th> Email <span className="icon-arrow"></span></th>
                        <th> Actions<span className="icon-arrow"></span></th>
                    </tr>
                </thead>
                <tbody>
                  {users}
                </tbody>
            </table>
        </section>
    
  )
}

export default TableUsers
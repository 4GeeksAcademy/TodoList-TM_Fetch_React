import React from "react";
import { useState, useEffect } from "react";
import "/workspaces/TodoList-TM_Fetch_React/src/styles/home.css"
//create your first component
const Home = () => {
    const [input, setInput] = useState("")
    const [tareas, setTareas] = useState([])

    async function postTarea() {
        try { //intenta hacer lo que esta en el bloque, sino va al catch

            const params = {
                method: "PUT", // Metodo que voy a utilizar de acuerdo a la documentacion de la API
                headers: { //informacion adicional a la peticion, seguridad etc
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tareas), // En este caso envio en formato JSON, las tareas

            }  // el segundo parametro se reemplazo para ver mas claro method, headers y body, si lo hago directo uso {}
            const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Tomas", params); 
                //Escuchar, procesar y respoder --> servidor
                console.log(response.ok);
            if (response.ok) console.log("200 ok"); // valida la peticion si es un 200 me guste o no la respuesta, puede ir un bloque else para manejar los errores
        
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        postTarea() // useEffect no acepta async o await necesita una funcion aparte
    }, [tareas])


    useEffect(()=>{
        crearUsuario()
        obtenerTareas()
        
    }, [])

    const crearUsuario = async()=>{
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Tomas", {
            method: "POST",
            body: JSON.stringify([]),
            headers: {"Content-Type": "application/json"}
        })
        const data = await response.json() //
        console.log(data);
    }


    const obtenerTareas = async()=>{
        try{

        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Tomas") //metodo get
        const data = await response.json()
        console.log(data);
        setTareas(data) // asignamos las tareas
        }catch (error) {
            console.log(error);
        }
    }


    function manejoEnvio(e) {
        e.preventDefault()
        if (input.trim() !== ""){
            const tareasActualizadas = [{ label: input, done: false }, ...tareas] // se agrega la tarea de acuerdo al formato de la api
            setTareas(tareasActualizadas)
            setInput("") // limpio el input
        } // si el input esta vacio no hace nada   
    }

    function borrar(id) {
        let nuevo = []
        nuevo = tareas.filter((item, index) => {
            if (index != id) {
                return item
            }
        })
        setTareas(nuevo)
    }

    return (
        <div className="tarea-contenedor">
            <form className="tarea-formulario"
                onSubmit={manejoEnvio}>
                <input
                    className="tarea-input"
                    type="text"
                    placeholder="Escribe una tarea"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>
            <ul className="list-unstyled ">
                {tareas.map((elemento, id) => (
                    //utilizo el .label para traer lo que esta almacenado en el array de tareas actualizadas
                    <li key={id}>
                        <div>
                        {elemento.label}
                        <button  className="trash" onClick={() => borrar(id)} style={{border: "none", backgroundColor: "black", color: "white" }}>
                             <div><i className="fa-solid fa-trash"></i></div>
                        </button>
                        </div>
                    </li>
                ))}
            </ul>

            <p>Tareas pendientes: {tareas.length} </p>
        </div>
    )
}

export default Home;

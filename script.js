//Se hacen unas constantes para que guarde eb un arreglo todo lo que pase en la pantalla y tambien un arreglo de boton para que guarde todo lo que se oprima con los botones en un queryselectorAll
const Pantalla = document.querySelector(".Pantalla");
const Botones = document.querySelectorAll(".Boton");
const maxLength = 8; // Define el límite de caracteres
let resultadoMostrado = false; //Variable para indicar si se mostro un resultado


Botones.forEach(Boton => {
    Boton.addEventListener("click", () => {
    //console.log(boton.textContent);

        const BotonOn = Boton.textContent;

        if (Boton.id === "Borrar") {
            if (Pantalla.textContent.length === 1|| Pantalla.textContent === "¡Error!") {
                Pantalla.textContent = "0"; //Con esta sentencia le pedimos que cuando la longitud llegue a un numero y este sea borrado que lo reemplace por un cero
            } else {
                Pantalla.textContent = Pantalla.textContent.slice(0, -1); //con la funcion slice(0, -1) le estamos dando un rango donde pedimos que borre numero a numero hasta llegar a cero o dejar vacio la pantalla de la operacion
            }
            return;    
        }

        if (Boton.id === "igual") {
            try {
                //Verificar si hay una division por cero
                const expression = Pantalla.textContent;
                if (expression.includes("/") && expression.split("/").slice(-1)[0].trim() === "0") {
                    throw new Error("División por cero");
                }
                //Verificar si hay multiples divisiones consecutivas
                if (/\/{2,}/.test(expression)) {
                    throw new Error("Error de Formato");
                }

                let resultado = eval(Pantalla.textContent);//La funcion eval es hacer una evalucion matematica de lo que encuentre lo evalua como una operacion matematica va identificar si es un =, +, - y lo tomara como operacion matematica
                resultadoMostrado = true; //Para indicar que se mostro un resultado
                resultado = resultado.toString();

                // Verifica si el resultado excede el límite
                if (resultado.length > maxLength) {
                    resultado = resultado.slice(0, maxLength); // Corta el resultado si es necesario
                }

                Pantalla.textContent = resultado; // Muestra el resultado en la pantalla

            } catch {
                Pantalla.textContent = "¡Error!";
                resultadoMostrado = false; //Modifica la variable en caso de presentar un error
            }
            return;
        }

        //Si se mostro un resultado previamente este pueda reemplazarlo
        if (resultadoMostrado) {
            Pantalla.textContent = BotonOn; //Reemplaza el resultado por el nuevo numero que se oprima en la calculadora
            resultadoMostrado = false; //Vuelve a dejar la variable en su estado inicial
        }else {
        
        //Verifica si la variable esta en cero o en un error
        if (Pantalla.textContent === "0" || Pantalla.textContent === "¡Error!") {
            Pantalla.textContent = BotonOn;
        } else {
            // Verifica que la longitud no exceda el límite
            if (Pantalla.textContent.length < maxLength) {
            Pantalla.textContent += BotonOn;
            }
        }
    }

            if (Boton.id === "Limpiar") {
                Pantalla.textContent = "0";
                return; //El return me permite terminar el codigo para que no se ejecute de forma secuencial y asi no pierda la funcion de Limpiar que se hace en este punto
            }
        
    })
})
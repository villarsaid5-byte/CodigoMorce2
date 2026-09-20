// CONVERSOR DE NOTACIONES---------------------------------
// Verifica si un carácter es un operador
function esOperador(caracter) {
    return ["+", "-", "*", "/", "^"].includes(caracter);
}
// Obtiene la prioridad de un operador
function prioridad(operador) {

    switch (operador) {

        case "+":
        case "-":
            return 1;

        case "*":
        case "/":
            return 2;

        case "^":
            return 3;

        default:
            return 0;
    }
}
// INFija -> POSTFIJA---------------------------------------------------------
function infijaAPostfija(expresion) {

    let salida = [];
    let pila = [];

    for (let i = 0; i < expresion.length; i++) {

        let caracter = expresion[i];

        // Ignorar espacios
        if (caracter === " ") {
            continue;
        }


        // Si es un operando
        if (/[a-zA-Z0-9]/.test(caracter)) {

            salida.push(caracter);
        }


        // Paréntesis izquierdo
        else if (caracter === "(") {

            pila.push(caracter);
        }


        // Paréntesis derecho
        else if (caracter === ")") {

            while (
                pila.length > 0 &&
                pila[pila.length - 1] !== "("
            ) {

                salida.push(pila.pop());
            }

            if (pila.length === 0) {
                throw new Error("Los paréntesis no son correctos.");
            }

            pila.pop();
        }


        // Si es operador
        else if (esOperador(caracter)) {

            while (
                pila.length > 0 &&
                pila[pila.length - 1] !== "(" &&
                (
                    prioridad(pila[pila.length - 1]) > prioridad(caracter)
                    ||
                    (
                        prioridad(pila[pila.length - 1]) === prioridad(caracter)
                        && caracter !== "^"
                    )
                )
            ) {

                salida.push(pila.pop());
            }

            pila.push(caracter);
        }


        // Carácter desconocido
        else {

            throw new Error(
                "Carácter no válido: " + caracter
            );
        }
    }


    // Vaciar la pila
    while (pila.length > 0) {

        if (pila[pila.length - 1] === "(") {
            throw new Error("Los paréntesis no son correctos.");
        }

        salida.push(pila.pop());
    }

    return salida;
}

// POSTFIJA -> PREFIJA-------------------------------------
function postfijaAPrefija(postfija) {

    let pila = [];

    for (let elemento of postfija) {

        // Si es operando
        if (!esOperador(elemento)) {

            pila.push(elemento);
        }

        // Si es operador
        else {

            let operando2 = pila.pop();
            let operando1 = pila.pop();

            if (
                operando1 === undefined ||
                operando2 === undefined
            ) {
                throw new Error("La expresión no es válida.");
            }

            let expresion =
                elemento + " " +
                operando1 + " " +
                operando2;

            pila.push(expresion);
        }
    }

    if (pila.length !== 1) {
        throw new Error("La expresión no es válida.");
    }

    return pila[0];
}
// VALIDAR EXPRESIÓN-----------------------------------------------
function validarExpresion(expresion) {

    let parentesis = 0;

    for (let caracter of expresion) {

        if (caracter === "(") {
            parentesis++;
        }

        if (caracter === ")") {
            parentesis--;

            if (parentesis < 0) {
                return false;
            }
        }
    }

    return parentesis === 0;
}

// CONVERTIR-----------------------------------------------
function convertir() {

    const input =
        document.getElementById("expresion");

    const contenedor =
        document.getElementById("arbol");

    let expresion =
        input.value.trim();


    // Limpiar resultados
    contenedor.innerHTML = "";

    // Verificar que no esté vacío
    if (expresion === "") {

        contenedor.innerHTML = `
            <div class="alert alert-warning">
                Ingresa una expresión.
            </div>
        `;

        return;
    }

    // Verificar paréntesis
    if (!validarExpresion(expresion)) {

        contenedor.innerHTML = `
            <div class="alert alert-danger">
                Los paréntesis de la expresión no son correctos.
            </div>
        `;

        return;
    }


    try {

        // Convertir a postfija
        const postfija =
            infijaAPostfija(expresion);


        // Convertir postfija a prefija
        const prefija =
            postfijaAPrefija(postfija);

        // MOSTRAR RESULTADOS----------------------------------------------
        contenedor.innerHTML = `

            <div class="card">

                <div class="card-header">
                    <h3>Resultados</h3>
                </div>

                <div class="card-body">

                    <div class="mb-3">
                        <h5>Infija</h5>

                        <div class="alert alert-secondary">
                            ${expresion}
                        </div>
                    </div>


                    <div class="mb-3">
                        <h5>Prefija</h5>

                        <div class="alert alert-primary">
                            ${prefija}
                        </div>
                    </div>


                    <div class="mb-3">
                        <h5>Postfija</h5>

                        <div class="alert alert-success">
                            ${postfija.join(" ")}
                        </div>
                    </div>

                </div>

            </div>

        `;

    } catch (error) {

        contenedor.innerHTML = `

            <div class="alert alert-danger">
                <strong>Error:</strong>
                ${error.message}
            </div>

        `;
    }
}

// BOTÓN----------------------------------------------
document
    .getElementById("btnConvertir")
    .addEventListener("click", convertir);


// Permitir convertir presionando ENTER
document
    .getElementById("expresion")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            convertir();
        }

    });

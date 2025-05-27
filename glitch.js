// Archivo: glitch.js

document.addEventListener('DOMContentLoaded', () => {
    const glitchElements = document.querySelectorAll('.glitch'); // Seleccionar todos los elementos con la clase glitch
    if (!glitchElements.length) return;

    const asciiBox = document.querySelector('.ascii-box'); // Seleccionar la caja del texto
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
    const typingInterval = 100; // Velocidad de escritura (ms por carácter)
    const transitionOverlap = 250; // Tiempo (ms) antes de que termine el efecto de la esquina para mostrar el texto principal
    const upperRightDelay = 500; // Delay (ms) antes de que comience el efecto superior derecho

    // Función para generar desplazamientos aleatorios
    function randOffset() {
        const v = Math.floor(Math.random() * 10) + 1;
        return (Math.random() < 0.5 ? '-' : '') + v + 'px';
    }

    // Función para aplicar el efecto de glitch a un elemento
    function applyGlitchEffect(glitchEl, originalText) {
        const timer = setInterval(() => {
            const x = randOffset();
            const y = randOffset();
            let display = '';
            for (let i = 0; i < originalText.length; i++) {
                const char = Math.random() < 0.3
                    ? glitchChars.charAt(Math.floor(Math.random() * glitchChars.length))
                    : originalText[i];
                display += char;
            }
            glitchEl.textContent = display;
            glitchEl.style.transform = `translate(${x}, ${y})`;
            glitchEl.style.color = '#ff00ff'; // Cambiar a rosa fosforescente
        }, typingInterval);

        return timer;
    }

    // Función para iniciar el ciclo de glitch en un elemento
    function startCycle(el) {
        const originalText = el.textContent;

        // Crear un elemento para el glitch inferior izquierdo
        const glitchBottomLeft = document.createElement('div');
        glitchBottomLeft.textContent = originalText;
        glitchBottomLeft.style.position = 'absolute';
        glitchBottomLeft.style.pointerEvents = 'none';
        glitchBottomLeft.style.color = '#ff00ff'; // Cambiar a rosa fosforescente
        glitchBottomLeft.style.whiteSpace = 'pre-wrap'; // Permitir saltos de línea
        glitchBottomLeft.style.fontSize = '0.5rem'; // Fuente más pequeña
        glitchBottomLeft.style.zIndex = '10';
        glitchBottomLeft.style.fontWeight = '100'; // Fuente delgada
        glitchBottomLeft.style.width = '50px'; // Ajustar ancho para dividir en dos líneas
        glitchBottomLeft.style.right = '90%'; // Ajustar posición horizontal
        glitchBottomLeft.style.bottom = '24%'; // Ajustar posición vertical
        asciiBox.appendChild(glitchBottomLeft); // Agregar el glitch dentro de la caja

        // Crear un elemento para el glitch superior derecho
        const glitchTopRight = document.createElement('div');
        glitchTopRight.textContent = originalText;
        glitchTopRight.style.position = 'absolute';
        glitchTopRight.style.pointerEvents = 'none';
        glitchTopRight.style.color = '#ff00ff'; // Cambiar a rosa fosforescente
        glitchTopRight.style.whiteSpace = 'pre-wrap'; // Permitir saltos de línea
        glitchTopRight.style.fontSize = '0.55rem'; // Fuente más pequeña
        glitchTopRight.style.zIndex = '10';
        glitchTopRight.style.fontWeight = '100'; // Fuente delgada
        glitchTopRight.style.width = '100px'; // Ajustar ancho inicial
        glitchTopRight.style.right = '-15%'; // Posición horizontal (esquina superior derecha)
        glitchTopRight.style.top = '15%'; // Posición vertical
        glitchTopRight.style.display = 'none'; // Ocultar inicialmente
        asciiBox.appendChild(glitchTopRight); // Agregar el glitch dentro de la caja

        // Fase 1: Glitch en la esquina inferior izquierda
        el.style.visibility = 'hidden'; // Ocultar el texto principal
        glitchBottomLeft.style.display = 'block'; // Mostrar el efecto de la esquina
        const glitchDuration = Math.random() * 1000 + 1000; // 1–2 segundos
        const bottomLeftTimer = applyGlitchEffect(glitchBottomLeft, originalText);

        // Fase 2: Iniciar el efecto superior derecho con un delay
        setTimeout(() => {
            glitchTopRight.style.display = 'block'; // Mostrar el efecto superior derecho
            const topRightTimer = applyGlitchEffect(glitchTopRight, originalText);

            // Detener el efecto superior derecho después de su duración
            setTimeout(() => {
                clearInterval(topRightTimer);
                glitchTopRight.style.display = 'none'; // Ocultar el efecto superior derecho
            }, glitchDuration); // Duración del efecto superior derecho
        }, upperRightDelay); // Delay antes de iniciar el efecto superior derecho

        // Mostrar el texto principal antes de que termine el efecto de la esquina
        setTimeout(() => {
            glitchBottomLeft.style.display = 'none'; // Ocultar el efecto de la esquina
            clearInterval(bottomLeftTimer); // Detener el efecto de la esquina

            // Fase 3: Glitch normal en el texto principal
            el.style.visibility = 'visible'; // Mostrar el texto principal
            const normalGlitchTimer = applyGlitchEffect(el, originalText);

            setTimeout(() => {
                clearInterval(normalGlitchTimer); // Detener el efecto normal
                el.textContent = originalText; // Restaurar el texto original
                el.style.transform = 'none'; // Detener el movimiento
                el.style.color = '#ff00ff'; // Cambiar a rosa fosforescente
                setTimeout(() => startCycle(el), Math.random() * 1000 + 3000); // Esperar antes de reiniciar
            }, glitchDuration); // Duración del efecto normal
        }, glitchDuration - transitionOverlap); // Ajustar inicio del efecto central
    }

    // Iniciar el ciclo de glitch para cada elemento
    glitchElements.forEach((el) => startCycle(el));
});
============================================ERRRORES A CORREGIR =======================================================

hacer responsive para movil la aplicacion


---INTRODUCCION---  

---TRAYECTORIA---

---STACK---

en el circulo de skills el 2simbolo contando desde el medio a abajo se chocha con el primero del medio .

---PROYECTOS---

---CONTACTAME---



 this.initStack(this.wrapsLeft, 240);
    this.initStack(this.wrapsRight, 240);
    this.updateScales('left', false);
    this.updateScales('right', false);



    NGONINIT
         this.tick();

          <div id="app-loader">
    <div class="loader"></div>
  </div>



  /* ==================== RESPONSIVE ==================== */

@media (min-width: 1024px) and (max-width: 1440px) {
  .section {
  min-height: 100vh; /* Cambia height por min-height para evitar que el contenido se corte */
  
  gap: 0px; /* 👈 AÑADE: Esto da una separación controlada entre las columnas */
  padding: 0; /* 👈 CAMBIO: Usa % en lugar de px para que se adapte al ancho */
 
}

#trayectoria.section {
  justify-content: flex-start;
  padding-left: 0px;
  padding-right: 0 !important;
  /* sobrescribe el de .section */
  box-sizing: border-box;
}
.timeline {
  flex: 1;                /* Ambas columnas crecen igual */
  max-width: 600px;       /* Evita que se estiren demasiado */
  list-style: none;
  padding: 0;             /* Reset de paddings por defecto de las listas */
  margin: 0;
}
.stack-columns {
  display: flex;
  justify-content: space-evenly; /* Separa los círculos Skills/Tools */
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;  /* BORRA el margin-right: 330px y usa AUTO */
  padding: 0;      /* Limpia paddings extra */
}


}

@media (min-width: 1024px) and (max-width: 1440px) {

.wrap-stack a {
  
  width: 80%;
  height: 80%;
  
}
.stack-columns {
  gap: 450px;
}





}
@media (max-width: 992px) {
   /* ------------------- GENERAL ------------------- */
.section {
   min-height: 100vh;
    justify-content: center;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 60px 20px 20px 20px;
}

/* ------------------- INTRODUCCIÓN ------------------- */
#introduccion.section {
    /* Mantenemos la configuración para apilar verticalmente */
    display: flex; /* Asegúrate de que display: flex; esté en tu CSS principal o aquí */
    flex-direction: column; 
    /* 👈 CORREGIDO */
    overflow-y: hidden;
    gap: 20px;
}

/* 1. Columna Derecha (Imagen y Logos) - QUEREMOS QUE VAYA ARRIBA */
.columna-derecha {
    /* CLAVE: Establecer un orden bajo (1) para que aparezca primero */
    order: 1; 
    
    /* Aseguramos que el contenido esté centrado si la columna ocupa todo el ancho */
    align-self: center; /* Centra la columna dentro de la sección si es más estrecha que 100% */
    text-align: center; /* Centra los elementos internos (logos, imagen) */
    
    margin-right: 0;
    margin-bottom: 20px; /* Añade un margen para separar la imagen de la siguiente columna (texto) */
}

/* 2. Texto Introducción - QUEREMOS QUE VAYA ABAJO */
.texto-introduccion {
    /* CLAVE: Establecer un orden más alto (2) para que aparezca después */
    order: 2; 
    
    /* Aseguramos que ocupe todo el ancho y se centre el texto */
    width: 50%; 
    max-width: 100%;
    text-align: center; 
}
.image-container {
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
}

.logos-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: nowrap;
    margin: 0;
}
.logo-circle{
  cursor: pointer;
}
.logo-link,
.logos-container a {
    width: 66px;
    height: 66px;
    flex-shrink: 0;
   }

.logo-circle {
    width: 100%;
    height: 100%;
}
h2 *{
    font-size: 9px;
}
.texto-introduccion  *{
  font-size: 9px;
}
.image-container img {
    width: 233px;
    height: 233px;
    margin-top: 29px;
    margin-left: -29px;
}
.texto-introduccion h3 {
        font-size: 11px; /* Ejemplo: si el original es 22px */
    }
    .texto-introduccion h1 {
        font-size: 15px; /* Ejemplo: si el original es 30px */
    }
    .texto-introduccion h2 {
        font-size: 12px; /* Ejemplo: si el original es 24px */
    }
.scroll-downs{
  display: none;
}






.btn {
    /* CLAVE: Reducimos el padding para el tamaño físico del botón */
    padding: 0.5rem 1rem !important; 
    
    /* Reducimos la fuente ligeramente para que se ajuste al padding */
    font-size: 0.8rem; 
    
    /* Aseguramos que se vean como bloques con el mismo alto y ancho */
    display: inline-block; 
    
    /* Ajustamos el borde */
    border-radius: 4px; 
    
    /* Evita que los botones se encojan de forma desigual */
    flex-shrink: 0; 
    
    /* Aseguramos que el texto esté centrado en caso de ser más largo */
    text-align: center;
}

/* 2. Ajuste de estilos del contenedor */
.botones-intro {
    display: flex;
    justify-content: center; /* Centra el par de botones */
    gap: 10px; /* Espacio entre el botón y el enlace */
}

/* 3. Ajuste para el botón nativo (button.btn-elegante) para asegurar que el padding se aplique correctamente, ya que los botones nativos a veces ignoran 'padding' sin 'display: inline-block' o 'block' */
button.btn.btn-elegante {
    /* Si ya tienes 'all: unset' en el global, no hace falta. Si no, añádelo: */
    /* all: unset; */
    /* Aplicamos el mismo padding por si el selector específico de escritorio está sobrescribiendo */
    padding: 0.5rem 1rem !important; 
}
/* ------------------- CONTENEDOR ------------------- */
.botones-intro {
    display: flex;
    justify-content: center; /* Para centrar los botones */
    gap: 10px; /* Reducimos el espacio entre ellos */
}
}
/* ------------------- TRAYECTORIA --------------------------------------------------------------------------------------------------------------------- */

@media screen and (max-width: 900px) {

  #trayectoria.section {
    padding-left: 10px;
    padding-right: 10px;
    justify-content: flex-start;
  }
 .btn-certificado .cert-btn {
    padding: 2px 4px !important;        /* reduce padding */
    font-size: 0.5rem !important;       /* reduce tamaño del texto */
    line-height: 1.1 !important;        /* ajusta altura de línea */
    border-radius: 1px !important;      /* bordes más pequeños */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important; /* sombra proporcional */
    white-space: normal !important;     /* permite dividir el texto */
    word-break: break-word !important;  /* evita overflow */
  }

  /* Títulos reducidos */
  .col-title{
    font-size: 0.9rem; /* 50% del original 1.8rem */

    margin-top: -87px;
  }
  .col-title-ex {
    font-size: 0.9rem; /* 50% del original 1.8rem */

    margin-top: -55px;
  }

  .col-title::after,
  .col-title-ex::after {
    width: 40px; /* 50% del original 80px */
    height: 1.5px;
  }

  /* Timeline */
  .timeline {
    width: 100%;
    margin-top: -100px;
    padding: 0.5em 0;
  }

  /* Apilar timeline verticalmente */
  .direction-l,
  .direction-r {
    float: none;
    width: 90%;
    text-align: left;
    margin-bottom: 1px; /* más compacto */
    padding-left: 3px;
 
  }

  .timeline:before {
    left: 10px; /* línea vertical más cerca */
    width: 3px;  /* mitad de grosor original */
  }

  /* Flags */
  .direction-l .flag,
  .direction-r .flag {
    font-size: 0.45rem; /* 50% de 0.9 rem */
    padding: 3px 5px;   /* reducido */
  }

  .direction-l .flag:before,
  .direction-r .flag:before {
    top: 0;
    left: 0;
    right: auto;
    width: 6px;  /* 50% de 12px */
    height: 6px; /* 50% de 12px */
    border-width: 2px; /* mitad del borde original */
    margin-top: 0;
  }

  .direction-l .flag:after,
  .direction-r .flag:after {
    display: none; /* elimina flechas */
  }

  /* Time wrapper */
  .time-wrapper {
    font-size: 0.35em; /* mitad de 0.7em */
  }

  .time {
    padding: 1.5px 2.5px; /* 50% de padding */
  }

  /* Descripción */
  .desc {
    font-size: 0.375em; /* mitad de 0.75em */
    margin: 0.25em 0 0 0; /* márgenes reducidos */
  }
}

/* ------------------- STACK ------------------- */
@media screen and (max-width: 900px) {

  #stack {
    width: 95%;
    padding-top: 20px;
    min-height: auto;
    max-height: auto;
  }

  /* Título principal */
  .stack-title {
    font-size: 3rem;           /* 50% del original 6rem */
    letter-spacing: 0.5rem;    /* reducir espacio entre letras */
    margin-bottom: 80px;       /* reducir margen inferior */
    margin-left: 0;            /* centrar en móvil */
    text-align: center;
  }

  .stack-title::before,
  .stack-title::after {
    width: 40px;  /* reducir líneas a la mitad */
    height: 1px;
    left: -45px;
    right: -45px;
  }

  /* Contenedores de skill circles */
  .stack-columns {
    width: 100%;
    margin-left: 0;
    justify-content: center;
    flex-wrap: wrap; /* si no caben, pasan a otra fila */
    gap: 15px;
  }

  .stack-column,
  .container-stack {
    width: 150px;   /* reducir tamaño de círculo */
    height: 150px;
  }

  .static-circle {
    width: 70px;
    height: 70px;
    font-size: 1rem;
    letter-spacing: 1px;
    transform: translate(-0%, +10%);
    border-width: 1px;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
  }

  .wrap-stack {
    width: 30px;
    height: 30px;
  }

  .wrap-stack a {
    border-radius: 5px;
    background-size: 60%;
  }

  .icon__name {
    font-size: 10px;
  }
}

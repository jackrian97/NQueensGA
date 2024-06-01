document.addEventListener("DOMContentLoaded", function() {
    var navMenu = '<ul>'+
                        '<li><a class= "index" href="./index.html">Virtualización</a></li>'+
                        '<li><a class= "funcion" href="./funcion.html">Funcionamiento</a></li>'+
                        '<li><a class= "extra" href="./extra.html">Extra</a></li>'+
                    '</ul>';
    document.querySelector("header nav").innerHTML = navMenu;
});

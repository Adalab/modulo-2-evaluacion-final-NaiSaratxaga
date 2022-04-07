# Hola 👋🏽, soy Naiara

Y este es mi ejercicio de evaluación final de JavaScript.
a continuación os explico un poco en que consiste.

- El ejercicio consiste en desarrollar una aplicación web que contiene un listado de las bebidas y cóteles de todo el mundo, que nos permite des/marcar las bebidas como favoritas y guardarlas en local storage.
- El ejercicio también tiene una parte de maquetación conHTML y Sass.

1. En primer lugar hay que realizar un aestructura básica sobre el modelo que nos proporcionan.

   La aplicación de búsqueda de cócteles consta de dos partes:
   . Un campo de texto y un botón para buscar un cóctel por su título.
   . Un listado de resultados de búsueda donde aparece la imagen del cóctel y el nombre.

2. Búsqueda
   . Al hacer click sobre el botón Buscar, la aplicación debe conectarse al API abierto de TheCocktailDB.
   . Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el
   campo de búsqueda.
   . Por cada cóctel contenido en el resultado de la búsqueda hay que pintar una tarjeta donde
   mostramos una imagen del cóctel y el nombre.
   . Algunas de los cócteles que devuelve el API no tienen imagen. En ese caso hay que mostrar una
   imagen de relleno.
   .Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML
   o manipulando de forma avanzada el DOM.

3. Favoritos
   Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestros cócteles
   favoritos. Para ello, al hacer clic sobre una cóctel debe pasar lo siguiente:
   . El color de fondo y el de fuente se intercambian, indicando que es un cóctel favorito.
   . Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda,
   con los cócteles favoritos. Os recomendamos crear un variable o constante de tipo array en JS para
   almacenar los cócteles favoritos.
   . Los cócteles favoritos deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

4. Almacenamiento local
   .Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado
   de favoritos se debe mostrarse.

5. BONUS: Borrar favoritos

6. BONUS: Afinar la maquetación

# Donde se puede ver 👀

http://beta.adalab.es/modulo-2-evaluacion-final-NaiSaratxaga/

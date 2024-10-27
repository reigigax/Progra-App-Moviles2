# Repositorio GitHub - Progra-App-Moviles2

# Crear un repositorio en GitHub
 - echo "# Progra-App-Moviles2" >> README.md
 - git init
 - git add README.md
 - git remote add origin *link del repositorio*
 - git add .
 - git commit -m "Creacion de Repositorio"
 - git branch -M main
 - git push -u origin main


# Subir un archivo a GitHub
 - git init
 - git add .
 - git commit -m "comentario"
 - git push -u origin main


# Actualizar Cambios del Repositorio en el Proyecto (cuando otra persona sube archivos al GitHub)
 - git pull origin main


# Comandos del Proyecto
 >> Proyecto Ionic
 - ionic start api-e2 blank --type=angular
 
 >> Paginas de la Aplicacion
 - ionic g page pages/login
 - ionic g page pages/crear-usuario
 - ionic g page pages/modificar-contrasena
 - ionic g page pages/principal
 - ionic g page pages/splash

 >> Base de Datos Local
 - npm install cordova-sqlite-storageionic
 - npm install @awesome-cordova-plugins/sqlite
 
 >> Creacion de Servicios
 - ionic g service services/api/api
 - ionic g service services/database/dblocal
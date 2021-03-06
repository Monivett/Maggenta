const express = require("express"); //Mandamos a llamar el contenido de la  librería exprees
const bodyParser = require("body-parser");//Mandamos a llamar el contenido de la  librería bodyparser
const app = express(); //Creamos la aplicación
const cors = require('cors')
const port = 5000; //Puerto del servicio
app.use(cors());

require('./models/connection')

/*Requiers de las rutas */
const Category_router = require('./routes/CategoryRoutes');
const Chat_router = require('./routes/ChatsRoutes');
const Comment_router = require('./routes/CommentRoutes');
const Follow_router = require('./routes/FollowRoutes');
const Like_router = require('./routes/LikeRoutes');
const Post_router = require('./routes/PostRoutes');
const Rules_router = require('./routes/RulesRouter');
const User_router = require('./routes/UserRoutes');
const Price_router = require('./routes/PriceRoutes');
const Comision_router = require('./routes/ComisionRoutes');

app.use(bodyParser.json());

app.use('/api', User_router);  //ya
app.use('/api', Chat_router);  //ya
app.use('/api', Follow_router);
app.use('/api', Category_router);  //ya
app.use('/api', Post_router);
app.use('/api', Like_router);
app.use('/api', Comment_router);
app.use('/api', Rules_router);
app.use('/api', Price_router);
app.use('/api', Comision_router);

//Que puerto va a tener la aplicación
app.listen(port, () => {
    console.log("La aplicación está escuchando al puerto " + port);
})
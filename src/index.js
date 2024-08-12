import app from "./app.js";
import { connectDB } from "./db.js";
const PORT = process.env.PORT | 2500;
// import('./authG/googleAuth.js')
connectDB();




app.listen(PORT, () =>
  console.log("escuchando por el puerto y estoy ejecutando desde index", PORT)
);



app.get('/', (req, res)=> {
  const htmlResponse = `
    <html>
      <head>
        <title> NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Esta Funcionando back end en Vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
})


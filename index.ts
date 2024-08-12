import express, { Request, Response } from "express";

const app = express();
const port = 3000;

type Product = {
    id: number,
    description: string,
    price: number,
    stock: number
}

const products: Product[] = [
    {
        id: 1,
        description: "Papa",
        price: 20,
        stock: 1000
    },
    {
        id: 2,
        description: "Pan",
        price: 10,
        stock: 1000
    },
    {
        id: 3,
        description: "Agua",
        price: 20,
        stock: 1000
    },
    {
        id: 4,
        description: "Papa",
        price: 200,
        stock: 1000
    },
];

// endPoint
// get obtener todos los productos
app.get('/api/inventory', (request: Request, response: Response) => {

    response.json({
        data: products
    });
});

app.get('/api/inventory/byDescription/:description', (request: Request, response: Response) => {
    const description = request.params.description;


    const result = products.find(
        (item) => item.description.toLocaleLowerCase() === description.toLocaleLowerCase());

    if (result === undefined) {
        return response.status(404)
            .json({
                msg: "No se encontro producto con la descripcion " + description
            });
    }
    
    response.json({
        data: result
    });
});

app.get('/api/inventory/filter/:description', (request: Request, response: Response) => {
    const description = request.params.description;

    const result = products.filter(
        (item) => item.description.toLocaleLowerCase() === description.toLocaleLowerCase());

    response.json({
        data: result
    });
});

app.get('/api/inventory/:id', (request: Request, response: Response) => {
    const id = request.params.id;

    const result = products.find(
        (item) => item.id === Number.parseInt(id));

    response.json({
        data: result
    });
});

app.get('/api/inventory/:description', (request: Request, response: Response) => {
    const id = request.params.id;

    const result = products.find(
        (item) => item.id === Number.parseInt(id));

    response.json({
        data: result
    });
});


/*

recibir parametros por la ruta 
localhost:3000/api/inventory/papa

comos hacer un post express
- body
- json

*/

// post 
// crear nuevo producto
app.post('/api/inventory', (request: Request, response: Response) => {

    response.json("Post");
});

app.put('/api/inventory', (request: Request, response: Response) => {

    response.json("Put");
});

app.delete('/api/inventory', (request: Request, response: Response) => {

    response.json("Delete");
});

app.listen(port, () => console.log(`This server is running at port ${port}`));
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
    }
];

// endPoint
// get obtener todos los productos
app.get('/api/inventory', (request: Request, response: Response) => {

    response.json({
            data: products
        });
});

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
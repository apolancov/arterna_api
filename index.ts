import express, { Request, Response } from "express";

const app = express();
const port = 3000;
let secuence = 0;

app.use(express.json()); //middleware


type Product = {
    id: number,
    description: string,
    price: number,
    stock: number
}

const products: Product[] = [

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
    /* const _description = request.body.description;
     const _price = request.body.price;
     const _stock = request.body.stock; */

    const { description, price, stock } = request.body;

    secuence += 1;

    const product: Product = {
        id: secuence,
        description,
        price,
        stock
    }

    products.push(product);

    response.status(201)
        .json({
            data: product
        });
});

app.put('/api/inventory/:id', (request: Request, response: Response) => {

    const { id } = request.params;
    const { description, price, stock } = request.body;

    const product = products.find((item) => item.id === Number.parseInt(id));

    if (!product) {
        return response.status(404)
            .json({
                msg: `No se encuentra un producto con el id: ${id}`
            });
    }

    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;

    response.status(201)
        .json({
            data: product
        });
});

app.delete('/api/inventory/:id', (request: Request, response: Response) => {
    const { id } = request.params;

    const product = products.find((item) => item.id === Number.parseInt(id));

    if (!product) {
        return response.status(404)
            .json({
                msg: `No se encuentra un producto con el id: ${id}`
            });
    }

    const productIndex = products.findIndex((item) => item.id === Number.parseInt(id));
    products.splice(productIndex, 1);

    response.json({
        msg: `Producto: ${product.description} borrado`
    });
});

app.listen(port, () => console.log(`This server is running at port ${port}`));
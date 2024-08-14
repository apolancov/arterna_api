import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// collections - colecciones
// array - arreglo - lista
// map - dictionary - diccionario - mapa
// set - conjunto

const sequences: Map<string, number> = new Map();
sequences.set('products', 0);
sequences.set('items', 0);
sequences.set('customers', 0);
sequences.set('sales', 0);

app.use(express.json()); //middleware

type Customer = {
    id: number,
    name: string
}

type Product = {
    id: number,
    description: string,
    price: number,
    stock: number
}

type Item = {
    id: number,
    description: string,
    price: number,
    qty: number
}

type Sell = {
    id: number,
    customer: Customer,
    items: Item[]
}

const customers: Customer[] = [
    { id: 1, name: "Pepe" },
    { id: 2, name: "Pepa" },
];

const products: Product[] = [];

const sales: Sell[] = [];

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

// post 
// crear nuevo producto
app.post('/api/inventory', (request: Request, response: Response) => {
    /* const _description = request.body.description;
     const _price = request.body.price;
     const _stock = request.body.stock; */

    const { description, price, stock, category } = request.body;

  
    const current_sequence = sequences.get('products')!;
    sequences.set('products', current_sequence + 1);

    const product: Product = {
        id: sequences.get('products')!,
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


app.post('/api/sell', (request: Request, response: Response) => {
    const { items, customer_id } = request.body;

    const customer = customers.find((c) => c.id === Number.parseInt(customer_id))

    const _items: Item[] = items.map((i: Item) => {
        const item = products.find((x) => x.id === i.id);

        const newItem: Item = {
            id: item!.id,
            description: item!.description,
            price: item!.price,
            qty: i.qty
        }

        return newItem;
    });

    const venta: Sell = {
        id: 1,
        items: _items,
        customer: customer!
    }

    sales.push(venta)
    response.json(sales);
});

app.listen(port, () => console.log(`This server is running at port ${port}`));

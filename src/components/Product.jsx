import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import '../assets/styles/product.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function Products() {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        }
        fetchProduct();
    }, []);
    return (products &&
        <div class="container">
            {products.map(product => ( // Map over the products array
                <Card key={product.id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.image} alt={product.title} />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.description.substring(0, 100)}...
                        </Card.Text>
                        <Card.Text>
                            Prix : {product.price} €
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))
            }
        </div>
    );
}
export default Products;
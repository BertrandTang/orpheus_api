import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../src/assets/styles/app.scss';
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
    <Container>
      <Row sm={6} md={4} className="g-3">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="h-100 w-100 m-4">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Card.Text>
                  <strong>Prix :</strong> {product.price} €
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function App() {

  return (
    <>
      <Products />
    </>
  )
}

export default App;

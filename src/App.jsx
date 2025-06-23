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
    <Container className="">
      <Row xs={4} sm={4}md={4} className="g-4 justify-content-center">
        {products.map(product => (
          <Col key={product.id} className="d-flex">
            <Card
              className="card-width-fixed"
            >
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="p-0 object-fit-contain d-block card-img-fixed-height"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description.substring(0, 100)}...
                </Card.Text>
                <Card.Text className="mt-auto">
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

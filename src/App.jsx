import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../src/assets/styles/app.scss';


function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  async function handleAddProduct() {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indique que les données envoyées sont au format JSON
      },
      body: JSON.stringify({ // Convertit l'objet JavaScript en une chaîne JSON
        title: "Naïnetendo Souitch 2",
        price: 449.99,
        description: "Un super produit ajouté via API",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });
    const data = await response.json();
    alert(` Le produit avec l'id ${data.id} a été créé `)
  }

  async function handleModifyProduct() {
    const response = await fetch("https://fakestoreapi.com/products/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Indique que les données envoyées sont au format JSON
      },
      body: JSON.stringify({ // Convertit l'objet JavaScript en une chaîne JSON
        price: 559.99,
      }),
    });
    const data = await response.json();
    alert(` Le produit avec l'id ${data.id} a été modifié `)
  }

  return (products &&

    <Container>
      <Button variant="primary" className="d-block mx-auto mb-4" onClick={handleAddProduct}>Ajouter un produit</Button>
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
              <Card.Footer className="d-flex justify-content-center">
                <Button variant="primary" className="d-flex" onClick={handleModifyProduct}>Modifier</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

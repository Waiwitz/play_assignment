import { Card, Col, Row } from "antd";
import { ProductList } from "./components/product-list";
import { Cart } from "./components/cart";

const contentCardStyle = "m-10 w-full h-full bg-slate-200 shadow-lg rounded-lg";

function App() {
  return (
    <main className="bg-gray-200 p-15 h-screen">
      {/* <Card className="shadow-lg rounded-lg">Head</Card> */}
      <Row gutter={24} className="my-5">
        <Col lg={16} md={16} sm={24} xs={24}>
          <Card className={contentCardStyle}>
            <ProductList />
          </Card>
        </Col>
        <Col lg={8} md={8} sm={24} xs={24}>
          <Card className={contentCardStyle}>
            <Cart />
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default App;

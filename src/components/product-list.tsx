import { Button, Card, Col, Image, Row, Typography } from "antd";
import { useDiscountModule } from "../hooks/use-discount-module";
import { productList } from "../placeholder/products";

export function ProductList() {
  const { onAddToCart } = useDiscountModule();
  return (
    <div>
      <Typography.Title level={4}>Product List</Typography.Title>

      <div className="overflow-x-scroll h-[70vh] mt-2">
        <Row
          gutter={[20, 20]}
          className="my-5 w-fit items-center justify-evenly"
        >
          {productList?.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={12} lg={11} xl={7}>
              <Card
                key={product.id}
                className="max-w-11/12 min-w-40 h-72 bg-slate-200 shadow-lg rounded-lg"
                hoverable
                classNames={{ body: "flex flex-col items-center" }}
                style={{ margin: "0 auto" }}
                styles={{
                  body: { padding: "1rem" },
                }}
              >
                <Image
                  className="rounded-lg shadow-lg object-cover m-auto"
                  preview={false}
                  src={product.imageUrl}
                  alt={product.name}
                  width={150}
                  height={150}
                />
                <div className="my-2 text-center">
                  <Typography.Title level={5}>{product.name}</Typography.Title>
                  <Typography.Text>{product.price} THB</Typography.Text>
                </div>
                <Button
                  className="mt-2"
                  type="default"
                  onClick={() => {
                    console.log("Add product to cart: ", product);
                    onAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

// const getProduct = async () => {
//   const response = await axios.get(
//     "https://api.escuelajs.co/api/v1/categories"
//   );
//   console.log(response.data);
//   return response.data;
// };

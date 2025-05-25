import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Empty,
  Flex,
  Form,
  InputNumber,
  List,
  Row,
  Select,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useDiscountModule } from "../hooks/use-discount-module";
import { couponMock, onTopMock } from "../placeholder/discount";
import { FaXmark } from "react-icons/fa6";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  DiscountType,
  OnTopType,
  type Coupon,
  type OnTop,
  type Seasonal,
} from "../store";
import { useDebouncedCallback } from "use-debounce";
import { useEffect } from "react";

export function Cart() {
  const {
    cart,
    onTop,
    onRemoveFromCart,
    onChangeQuantity,
    totalDiscountPrice,
    setCoupon,
    setOnTop,
    seasonal,
    setSeasonal,
    limitOnTopPoint,
    loading,
  } = useDiscountModule();
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      const onTopPoint = form.getFieldValue("onTop_point");
      if (onTopPoint > limitOnTopPoint)
        form.setFieldValue("onTop_point", limitOnTopPoint);
    }, 500);
  }, [limitOnTopPoint, form]);

  const onValueChange = useDebouncedCallback(
    (value: number | null, field: "onTop_point" | "every" | "discount") => {
      if (field === "onTop_point" && onTop?.on_top_type === OnTopType.POINT) {
        setOnTop({
          ...(onTop as OnTop),
          discount: value ?? 0,
        });
      } else if (field === "every" && seasonal) {
        setSeasonal({
          ...(seasonal as Seasonal),
          every: value ?? 0,
        });
      } else if (field === "discount" && seasonal) {
        setSeasonal({
          ...(seasonal as Seasonal),
          discount: value ?? 0,
        });
      }
    }
  );

  return (
    <div>
      <Typography.Title level={4}>Cart</Typography.Title>

      <Flex className="h-full flex-col gap-4">
        {/* Cart Items */}
        <div className="overflow-y-auto mt-2 h-[40vh] border border-gray-200 rounded p-4">
          {cart.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item) => {
                return (
                  <div className="w-full flex py-1 items-center justify-between">
                    <Space className="gap-4">
                      <Avatar size={100} src={item.imageUrl} shape="square" />
                      <div>
                        <Typography className="font-bold">
                          {item.name}
                        </Typography>

                        {loading ? (
                          <Skeleton.Input block />
                        ) : (
                          <>
                            <Typography.Text
                              delete={item.discountPrice !== item.sumPrice}
                            >
                              {item.sumPrice} THB
                            </Typography.Text>
                            {item.discountPrice !== item.sumPrice && (
                              <Typography className="font-bold">
                                {item.discountPrice} THB
                              </Typography>
                            )}
                          </>
                        )}
                      </div>
                    </Space>

                    <div className="flex gap-2 items-center">
                      <Space>
                        <Button
                          disabled={item.amount <= 1 || loading}
                          icon={<BiMinus />}
                          onClick={() =>
                            onChangeQuantity(item, item.amount - 1)
                          }
                        />
                        {item.amount}
                        <Button
                          disabled={loading}
                          icon={<BiPlus />}
                          onClick={() =>
                            onChangeQuantity(item, item.amount + 1)
                          }
                        />
                      </Space>
                      <Button
                        onClick={() => onRemoveFromCart(item)}
                        shape="circle"
                        size="small"
                        icon={<FaXmark />}
                      />
                    </div>
                  </div>
                );
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Empty description={"Cart are empty 🛒"} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border h-[30vh] overflow-auto border-gray-200 rounded p-4 flex flex-col gap-4">
          <Form form={form}>
            <Form.Item label="Coupon" name={"coupon"}>
              <Select
                options={couponMock}
                onChange={(_, option) => setCoupon(option as Coupon)}
                allowClear
                onClear={() => setCoupon(null)}
              />
            </Form.Item>

            <Row gutter={5}>
              <Col lg={16} xs={24}>
                <Form.Item label="On Top" name={"onTop"}>
                  <Select
                    options={onTopMock}
                    onChange={(_, option) => {
                      const selectedOnTop = option as OnTop;
                      setOnTop(selectedOnTop);
                      if (selectedOnTop.on_top_type !== OnTopType.POINT)
                        form.resetFields(["onTop_point"]);
                    }}
                    allowClear
                    onClear={() => {
                      setOnTop(null);
                      form.resetFields(["onTop_point"]);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} xs={24} hidden={onTop?.on_top_type !== OnTopType.POINT}>
                <Form.Item name={"onTop_point"}>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter your point"
                    max={limitOnTopPoint}
                    min={0}
                    onChange={(value) =>
                      onValueChange(value as number | null, "onTop_point")
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <div>
              <Form.Item
                label="Include Seasonal"
                name={"seasonal"}
                labelCol={{ span: 8 }}
                style={{ marginBottom: 10 }}
              >
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSeasonal({
                        every: 0,
                        discount: 0,
                        discount_type: DiscountType.FIXED,
                      });
                    } else {
                      setSeasonal(null);
                      form.resetFields(["every", "discount"]);
                    }
                  }}
                />
              </Form.Item>

              <Row gutter={10} hidden={!seasonal}>
                <Col span={12}>
                  <Form.Item name={"every"}>
                    <InputNumber
                      min={0}
                      onChange={(value) =>
                        onValueChange(value as number | null, "every")
                      }
                      placeholder="Every"
                      suffix={"THB"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={"discount"}>
                    <InputNumber
                      min={0}
                      onChange={(value) =>
                        onValueChange(value as number | null, "discount")
                      }
                      placeholder="Discount"
                      suffix={"THB"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>

          {loading ? (
            <Skeleton.Input block active />
          ) : (
            <div className="text-right font-bold text-2xl">
              <span>Total: </span>
              <span>{totalDiscountPrice} THB</span>
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
}

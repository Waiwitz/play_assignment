import {
  Avatar,
  Button,
  Checkbox,
  Empty,
  Flex,
  Form,
  List,
  Select,
  Space,
  Typography,
} from "antd";
import { useDiscountModule } from "../hooks/use-discount-module";
import { couponMock, onTopMock } from "../placeholder/discount";
import { FaXmark } from "react-icons/fa6";
import { BiMinus, BiPlus } from "react-icons/bi";
import type { Coupon, OnTop } from "../store";

export function Cart() {
  const {
    cart,
    onRemoveFromCart,
    onChangeQuantity,
    summaryPrice,
    setCoupon,
    setOnTop,
    setIsIncludedSeasonal,
  } = useDiscountModule();

  return (
    <div>
      <Typography.Title level={4}>Cart</Typography.Title>

      <Flex className="h-full flex-col gap-4">
        <div className="overflow-y-auto mt-2 h-86 border border-gray-200 rounded p-4">
          {cart.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item) => (
                <div className="w-full flex py-1 items-center justify-between">
                  <Space className="gap-4">
                    <Avatar size={100} src={item.imageUrl} shape="square" />
                    <div>
                      <Typography className="font-bold">{item.name}</Typography>
                      <Typography>{item.price} THB</Typography>
                    </div>
                  </Space>

                  <div className="flex gap-2 items-center">
                    <Space>
                      <Button
                        icon={<BiPlus />}
                        onClick={() =>
                          onChangeQuantity(item, item.quantity + 1)
                        }
                      />
                      {item.quantity}
                      <Button
                        disabled={item.quantity <= 1}
                        icon={<BiMinus />}
                        onClick={() =>
                          onChangeQuantity(item, item.quantity - 1)
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
              )}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Empty description={"Cart are empty 🛒"} />
            </div>
          )}
        </div>
        <div className="border h-60 border-gray-200 rounded p-4 flex flex-col gap-4">
          <Form labelCol={{ span: 4 }}>
            <Form.Item name="coupon" label="Coupon">
              <Select
                options={couponMock}
                onChange={(_, option) => setCoupon(option as Coupon)}
              />
            </Form.Item>
            <Form.Item name="on_top" label="On Top">
              <Select
                options={onTopMock}
                onChange={(_, option) => setOnTop(option as OnTop)}
              />
            </Form.Item>
            <Form.Item
              name="seasonal"
              label="Include Seasonal"
              labelCol={{ span: 8 }}
            >
              <Checkbox
                onChange={(e) => setIsIncludedSeasonal(e.target.checked)}
              />
            </Form.Item>
          </Form>

          <Typography.Text>{summaryPrice}</Typography.Text>
        </div>
      </Flex>
    </div>
  );
}

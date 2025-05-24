export type ProductCategory = "Clothing" | "Accessories" | "Electronics";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
}

export const productList: Product[] = [
  {
    id: "p001",
    name: "T-Shirt",
    category: "Clothing",
    price: 350,
    imageUrl:
      "https://unblast.com/wp-content/uploads/2024/03/Mens-T-shirt-Mockup-PSD.jpg",
  },
  {
    id: "p002",
    name: "Hoodie",
    category: "Clothing",
    price: 700,
    imageUrl:
      "https://unblast.com/wp-content/uploads/2019/10/Hoodie-With-Tag-Mockup-2.jpg",
  },
  {
    id: "p003",
    name: "Hat",
    category: "Accessories",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1585386952164-d2dbe8b10f9d",
  },
  {
    id: "p004",
    name: "Belt",
    category: "Accessories",
    price: 230,
    imageUrl: "https://images.unsplash.com/photo-1618354691540-9d43e1f98ba1",
  },
  {
    id: "p005",
    name: "Smart Watch",
    category: "Electronics",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
  },
  {
    id: "p006",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1587574293340-ec07293f1b03",
  },
];

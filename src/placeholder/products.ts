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
    imageUrl: "https://unblast.com/wp-content/uploads/2023/05/Bucket-Hat-Mockup-2.jpg",
  },
  {
    id: "p004",
    name: "Belt",
    category: "Accessories",
    price: 230,
    imageUrl: "https://mockupbee.com/wp-content/uploads/2022/06/Leather-Belt-Mockup.jpg",
  },
  {
    id: "p005",
    name: "Watch",
    category: "Electronics",
    price: 850,
    imageUrl: "https://unblast.com/wp-content/uploads/2020/04/Apple-Watch-Series-5-3D-Model.jpg",
  },
  {
    id: "p006",
    name: "Headphones",
    category: "Electronics",
    price: 1500,
    imageUrl: "https://unblast.com/wp-content/uploads/2020/07/Headphone-Mockup-1.jpg",
  },
];

export class item {
  itemID: number;
  name: string;
  description: string;
  price: number;
  stock: number;

  constructor(itemID: number, name: string, description: string, price: number, stock: number) {
    this.itemID = itemID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}

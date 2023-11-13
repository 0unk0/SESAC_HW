import { v4 as uuid } from "uuid";
import { readId, getId } from "./HW10_common.js";

export class OrderItem {
  orderIdList = readId("./csv/order.csv");
  itemIdList = readId("./csv/item.csv");

  getOrderItemTypeCSV() {
    return `${this.Id},${this.OrderId},${this.ItemId}`;
  }
  setOrderItem() {
    this.Id = this.generateOrderItemId();
    this.OrderId = this.readOrderId(this.orderIdList);
    this.ItemId = this.readItemId(this.itemIdList);
  }

  generateOrderItemId() {
    return uuid();
  }
  readOrderId(orderIdList) {
    return getId(orderIdList);
  }
  readItemId(itemIdList) {
    return getId(itemIdList);
  }
}

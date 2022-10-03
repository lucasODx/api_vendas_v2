import Customer from "@modules/customers/typeorm/entities/Customer";
import Products from "@modules/products/typeorm/entities/Products";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";

@Entity('orders_products')
export default class OrdersProducts {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Order, order => order.orders_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Products, product => product.orders_products)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

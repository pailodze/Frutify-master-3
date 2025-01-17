import React, { useState } from "react";
import styles from "./FruitCard.module.css";
import Link from "next/link";
import axios from "axios";
import { useRecoilState } from "recoil";
import { productState } from "@/app/states";
import { useRouter } from "next/navigation";

export interface Fruit {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}
type Props = {
  fruit: Fruit;
};

const FruitCard = (props: Props) => {

  const [products,setProduct] = useRecoilState(productState)
  const router = useRouter();

  const onDelete = async () => {
    const answer = confirm('Are you sure that you want to delete')
    console.log(answer);
     
    if(answer) {
      await axios.delete(`http://10.10.50.59:3000/products/${props.fruit.id}`)
      const newProducts = await axios.get('http://10.10.50.59:3000/products')
      setProduct(newProducts.data)
    }
  }

  const onEdit = () => {
    router.push(`/addproduct?id=${props.fruit.id}`)
  }


  return (
    <div className={styles.fruitCard}>
      <div className={styles.imageWrapper}>
        <img src={props.fruit.image} />
        <div className={styles.iconsWrapper}>
          <div className={styles.iconWrapper} onClick={onEdit}>
            <img src={"/images/pen.svg"} />
          </div>
          <div className={styles.iconWrapper} onClick={onDelete}>
            <img src={"/images/trash.svg"}  />
          </div>
        </div>
      </div>
      <div className={styles.fruitDescription}>
        <div className={styles.fruitName}>
          <span className={styles.fruitname}>{props.fruit.name}</span>
          <span className={styles.fruitColor}>{props.fruit.category} </span>
        </div>
        <div>
          <span className={styles.fruitPrice}>{props.fruit.price} </span>
        </div>
      </div>
      <Link
        href={`/Product?id=${props.fruit.id}`}
        className={styles.fruitBuyNow}
      >
        <span className={styles.buyNowText}>Buy Now</span>
      </Link>
    </div>
  );
};
export default FruitCard;

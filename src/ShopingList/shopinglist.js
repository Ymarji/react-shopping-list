import { useState } from "react";
import { ShopingForm } from "./ProductForm/ProductForm";
import { ItemList } from "./itemList/ItemList";
import styles from "./shopingList.module.css";

import { ItemCard } from "./itemCard/ItemCard";

export const ShopingList = () => {
  const [itemList, setItemList] = useState([]);
  const [packedQuery, setPackedQuery] = useState("");
  const [unpackedQuery, setUnpackedQuery] = useState("");

  const getPackedTotal = () => {
    return itemList.reduce((sum, val) => {
      if (val.packed === true) return (sum += Number(val.price));
      return sum;
    }, 0);
  };
  const itemAddToList = (item) => {
    setItemList([...itemList, item]);
    // console.log(itemList)
  };

  const getUnpacked = () => {
    return itemList.filter(
      (value) => value.packed === false && value.name.includes(unpackedQuery)
    );
  };

  const getPacked = () => {
    return itemList.filter(
      (value) => value.packed === true && value.name.includes(packedQuery)
    );
  };

  const removeItem = (item) => {
    console.log(item);
    setItemList(itemList.filter((value) => value.id !== item.id));
  };

  const changePacked = (item) => {
    // console.log(item)
    setItemList([
      ...itemList.filter((value) => value.id !== item.id),
      { ...item, packed: !item.packed },
    ]);
  };

  const hundleFilterChangeUnpack = (ev) => {
    ev.preventDefault();
    setUnpackedQuery(ev.target.value);
  };

  const hundleFilterChange = (ev) => {
    ev.preventDefault();
    setPackedQuery(ev.target.value);
  };

  const makeAllUnpacked = () => {
    setItemList(itemList.map((value) => ({ ...value, packed: false })));
  };

  return (
    <>
      <ShopingForm onSubmit={itemAddToList} />
      <ItemList>
        <h4> Unpacked List </h4>
        <label className={styles.inputLabel}>
          <input
            type="text"
            name="filter"
            value={unpackedQuery}
            onChange={hundleFilterChangeUnpack}
            placeholder="Filter inside unpacked item"
            className={styles.basicInput}
          />
        </label>
        {getUnpacked().map((value, index) => {
          return (
            <ItemCard
              key={index}
              item={value}
              removeItem={removeItem}
              changePacked={changePacked}
            ></ItemCard>
          );
        })}
      </ItemList>
      <ItemList>
        <h4> packed List </h4>
        <label className={styles.inputLabel}>
          <input
            type="text"
            name="filter"
            value={packedQuery}
            onChange={hundleFilterChange}
            placeholder="Filter inside unpacked item"
            className={styles.basicInput}
          />
        </label>
        {getPacked().map((value, index) => {
          return (
            <ItemCard
              key={index}
              item={value}
              removeItem={removeItem}
              changePacked={changePacked}
            ></ItemCard>
          );
        })}
      </ItemList>
      <button className={styles.button} onClick={makeAllUnpacked}>
        {" "}
        make all unpacked
      </button>
      <p> total : {getPackedTotal()} $</p>
    </>
  );
};

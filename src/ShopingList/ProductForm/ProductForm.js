import { useState } from "react";
import styles from "./productForm.module.css";

export const ShopingForm = ({onSubmit}) => {
  const [item, setItem] = useState({ name: "", price: "" });

  const hundleFormChange = (ev) => {
      ev.preventDefault()
      setItem({...item, [ev.target.name]: ev.target.value})
      console.log(item)
  }

  const hundelSubmit = ev => {
    ev.preventDefault()
    onSubmit({...item,id: Date.now() , packed: false})
  }

  return (
    <>
      <form className={styles.container} onSubmit={hundelSubmit}>
        <input
          type="text"
          placeholder="Product"
          name="name"
          value={item.name}
          className={styles.inputName + " " + styles.basicInput}
          onChange={hundleFormChange}
          required
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          min={0}
          value={item.price}
          className={styles.inputPrice + " " + styles.basicInput}
          onChange={hundleFormChange}
          required
        />
        <button type="submit" className={styles.buttonAdd}>
          Add
        </button>
      </form>
    </>
  );
};

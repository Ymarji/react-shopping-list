import styles from './ItemCard.module.css'

export const ItemCard = ({item, removeItem, changePacked}) => {
    const hundleFun = (ev) => {
        console.log(item);

        ev.preventDefault()

        changePacked(item)
    }

    const handleRmove = (ev) => {
        ev.preventDefault()
        removeItem(item)
    }
  return (
      <div className={styles.itemCard}>
        <label htmlFor={item.id} className={styles.checkboxLabel}>
            <span  className={(item.packed === false)? styles.hidden :''}>&#10003;</span>
        </label>
        <input type="checkbox" name="" id={item.id} className={styles.checkbox} onClick={hundleFun}/>
        <div className={styles.cardName}>
            <span>{item.name}</span>
            <span>{item.price}$</span>
        </div>
        <div onClick={handleRmove}><span className={styles.delete}>&#10005;</span></div>
      </div>
  );
};

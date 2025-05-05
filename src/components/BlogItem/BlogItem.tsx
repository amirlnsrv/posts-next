import React from "react";

import styles from "./BlogItem.module.css";

export default function BlogItem({ title, body }) {
  return (
    <div className={styles.post}>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

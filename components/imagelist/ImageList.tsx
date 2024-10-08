import React, { useContext } from "react";
import ImageListItem from "./ImageListItem";
import styles from "./ImageList.module.css";
import SearchContext from "@/contexts/SearchContext";
import { FolderContentsProps } from "@/api/share";

export default function ImageList({ data }: { data: FolderContentsProps }) {
  const {
    folder: { links },
  } = data;

  const { inputValue } = useContext(SearchContext);
  if (!inputValue) {
    return (
      <ul>
        <div className={styles.container}>
          {links?.map((item) => (
            <li key={item.id}>
              <ImageListItem item={item} />
            </li>
          ))}
        </div>
      </ul>
    );
  }
  return (
    <ul>
      <div className={styles.container}>
        {links?.map((item) => {
          const { url, title, description } = item;
          if (
            url.includes(inputValue) ||
            title.includes(inputValue) ||
            description.includes(inputValue)
          ) {
            return (
              <li key={item.id}>
                <ImageListItem item={item} />
              </li>
            );
          }
        })}
      </div>
    </ul>
  );
}

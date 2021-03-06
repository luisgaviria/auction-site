import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import NewRepoTile from "./newRepoTile.js";

const NewRepoList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const temp = [];
    console.log(props.repo);
    props.repo.map((repoItem, i) => {
      let favoriteTemp = false;
      props.favorites.map((favorite) => {
        if (favorite.address.trim() == repoItem.address.trim()) {
          favoriteTemp = true;
        }
      });

      temp.push({ ...repoItem, favorite: favoriteTemp });
    });

    setItems(temp);
  }, [props.favorites]);

  return (
    <>
      {items.map((item) => {
        if (item.date) {
          if (item.status) {
            if (
              !item.status.toUpperCase().includes("SOLD") &&
              !item.date.toUpperCase().includes("SOLD") &&
              !item.status.toUpperCase().includes("CANCELLED")
            ) {
              return (
                <React.Suspense key={item.id}>
                  <NewRepoTile
                    favorite={item.favorite}
                    repoData={item}
                    reloadFavorites={props.getFavorites}
                    user={props.user}
                  />
                </React.Suspense>
              );
            }
          } else {
            return (
              <React.Suspense
                key={item.id}
                // fallback={
                //   <Spinner animation="border" role="status">
                //     <span className="visually-hidden"></span>
                //   </Spinner>
                // }
              >
                <NewRepoTile
                  favorite={item.favorite}
                  repoData={item}
                  reloadFavorites={props.getFavorites}
                  user={props.user}
                />
              </React.Suspense>
            );
          }
        }
      })}
    </>
  );
};

export default NewRepoList;

import socket from "./socketClient.js";

socket.on("products", (data) => {
  if (data === "reload") {
    let list = document.getElementById("productDisplay");
    setTimeout(() => {
      fetch("./docs/products.txt")
        .then((res) => {
          return res.json();
        })
        .then((mapping) => {
          list.innerHTML = "";

          let display = mapping
            .map((prod) => {
              return `
                    <div class=" flex w-full h-24 m-1 p-2" style="place-items: center">
                        <div class="w-8 mr-2 text-center font-bold">${prod.id}</div>
                        <div class="w-3/4">${prod.title}</div>
                        <div class="w-20 text-center">${prod.price}</div>
                        <div class="w-48 flex justify-center"><img alt="thumbnail" class="h-20" style="max-width: 10em; object-fit: contain; src=${prod.thumbail}></div>
                    </div>
                            `;
            })
            .join("");
          list.innerHTML = display;
        })
        .catch((err) => console.log("Error: ", err));
    }, 500);
  }
});

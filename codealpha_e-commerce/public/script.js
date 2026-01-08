const container = document.getElementById("products");

fetch("/products")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<h2>No products found</h2>";
      return;
    }

    data.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <img src="/images/${p.image}">
          <h3>${p.name}</h3>
          <p class="price">₹${p.price}</p>
          <button onclick="addToCart('${p.name}', ${p.price})">
            Add to Cart
          </button>
        </div>
      `;
    });
  });

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart 🛒");
}


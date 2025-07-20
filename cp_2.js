function fetchProductsThen() {
  fetch('https://www.course-api.com/javascript-store-products')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        console.log(`Product: ${product.fields.name}`);
      });
    })
    .catch(err => console.error('Error finding products:', err));
}


async function fetchProductAsync() {
  try {
    const response = await fetch('https://www.course-api.com/javascript-store-products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error); 
  }
}

function displayProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  products.slice(0, 5).forEach(product => {
    const div = document.createElement('div');
    div.textContent = product.fields.name;
    container.appendChild(div);
  });
}


function handleError(error) {
  console.error('An error occured:', error);
}


const productContainer = document.getElementById('product-list');
fetch('https://www.course-api.com/javascript-store-products')
  .then(response => response.json())
  .then(products => {
    productContainer.innerHTML = products
      .slice(0, 5)
      .map(product => {
        const { name, price, image } = product.fields;
        return `
          <div class="product-card">
            <img src="${image[0].url}" alt="${name}" />
            <h3>${name}</h3>
            <p>$${(price / 100).toFixed(2)}</p>
          </div>
        `;
      }).join('');
  })
  .catch(error => {
    productContainer.innerHTML = `<p class="error">Error loading products.</p>`;
    console.error('Fetch error:', error);
  });


fetchProductsThen();
fetchProductAsync();


const url=`https://fierce-mountain-61321.herokuapp.com/products`;

const fetchData=async url=>{
    const res=await fetch(url);
    const data=await res.json();
    displayData(data);
}
const goodsSection=document.getElementById('productss-container');
const previewDiv=document.getElementById('productss-preview');
const displayData=productsData=>{
    //console.log(productsData);
    productsData.forEach(product=>{
        const name=product.Name;
        //console.log(name);
        const card=document.createElement('div');
        card.classList.add('product');
        card.setAttribute('data-name',`${product._id}`)
        card.innerHTML=`
        <img src=${product.Image} alt="">
          <h3>${product.Name}</h3>
        `;
        goodsSection.appendChild(card);


        //this is preview section code
        const previewCart=document.createElement('div');
        previewCart.classList.add('preview');
        previewCart.setAttribute('data-target',`${product._id}`);
        previewCart.innerHTML=`
        <i class="fas fa-times"></i>
       <h3>${product.Name}</h3>
       <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
       </div>
       <p>${product.Details}</p>
       <div class="price">${product.Price}</div>
       <div class="buttons">
          <a href="#" class="buy">buy now</a>
          <a href="#" class="cart">add to cart</a>
       </div>
        `;
        previewDiv.appendChild(previewCart);
    })
}
fetchData(url);



//code for preview display
const showPreview=()=>{
setTimeout(function(){
  let preveiwContainer = document.querySelector('.products-preview');
  let previewBox = preveiwContainer.querySelectorAll('.preview');
  console.log('script running');
  document.querySelectorAll('.products-container .product').forEach(product =>{
    product.onclick = () =>{
      console.log("products clicked");
      preveiwContainer.style.display = 'flex';
      let name = product.getAttribute('data-name');
      previewBox.forEach(preview =>{
        let target = preview.getAttribute('data-target');
        if(name == target){
          preview.classList.add('active');
        }
      });
    };
  });
  
  previewBox.forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
      close.classList.remove('active');
      preveiwContainer.style.display = 'none';
    };
  });
},1000)
}
showPreview();
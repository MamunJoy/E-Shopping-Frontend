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
          <!-- <a href="#" class="buy">buy now</a>
           <a href="#" class="cart">add to cart</a>-->
          <button class="buy">Buy Now</button>
          <button onclick="addToCart(${product.id},${product.Price},1)" class="cart">Add to Cart</button>
       </div>
        `;
        previewDiv.appendChild(previewCart);
    })
}
fetchData(url);

//add to cart section
let cart=[];
document.getElementById("cart-btn").innerText=cart.length;
const addToCart=(productId,productPrice,productQuantity)=>{
  const exists=cart.find(pdDetails=>pdDetails.id==productId);
  let upCart={};
  if(exists){
    const rest=cart.filter(pdDetails=>pdDetails.id!=productId);
    exists.quantity=exists.quantity+1;
    cart=[...rest,exists];
  }
  else{
    upCart={"id":productId,"price":productPrice,"quantity":productQuantity};
    cart=[...cart,upCart];
  }
  console.log(cart);
  document.getElementById("cart-btn").innerText=cart.length;
  showDataOnCart([upCart]);
}

const productDiv=document.getElementById("products-list");
const showDataOnCart=products=>{
  products.forEach(product=>{
    console.log("data from cart",product);
    const div=document.createElement('div');
    div.innerHTML=`
    <div class="fs-3">Product Id: ${product.id} Product Price: ${product.price}</div>
    `
    productDiv.appendChild(div);
  })
}
//report generation code
const { PDFDocument, StandardFonts, rgb } = PDFLib

    async function createPdf() {
      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()

      // Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

      // Add a blank page to the document
      const page = pdfDoc.addPage()

      // Get the width and height of the page
      const { width, height } = page.getSize()

      // Draw a string of text toward the top of the page
      const fontSize = 30
      page.drawText('List of Ordered Products: ', { x: 50, y: height - 4 * fontSize, size: 20,font: timesRomanFont,
        color: rgb(0, 0.53, 0.71), })
        let lineHeight=height-150;
        cart.forEach(product=>{
          page.drawText(`Product Id: ${product.id} Product Price: ${product.price}`, { x: 100, y:lineHeight, size: 15,font: timesRomanFont })
          lineHeight-=30;
        })
      

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
      download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
    }

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
},500)
}
showPreview();
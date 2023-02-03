var allProducts = [];

if(localStorage.getItem("myStorage" )!= null){
    allProducts = JSON.parse(localStorage.getItem("myStorage"))
    displayProducts();
}


function actions(){
    addProducts();
    displayProducts();
    clearInputs();
}


function addProducts(){
    var productName = document.getElementById("pName").value;
    var productPrice = document.getElementById("pPrice").value;
    var productCat = document.getElementById("pCat").value;
    var productDesc = document.getElementById("pDesc").value;

    var oneProduct = {name: productName, price: productPrice, cat: productCat, desc:productDesc}
    allProducts.push(oneProduct)

    localStorage.setItem("myStorage", JSON.stringify(allProducts))
}


function clearInputs(){
    document.getElementById("pName").value = ""
    document.getElementById("pPrice").value = ""
    document.getElementById("pCat").value = ""
    document.getElementById("pDesc").value = ""
}


function displayProducts(){
    var total = ``
    for(var i = 0 ; i < allProducts.length ; i++){
        total += `<tr>
        <td>`+ allProducts[i].name +`</td>
        <td>`+ allProducts[i].price +`</td>
        <td>`+ allProducts[i].cat +`</td>
        <td>`+ allProducts[i].desc +`</td>
        <td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("printP").innerHTML = total;
}


function deleteProduct(myIndex){
    allProducts.splice(myIndex , 1)
    displayProducts();
    localStorage.setItem("myStorage" , JSON.stringify(allProducts));
}


function searchProduct(){
    var searchArray = [];

    var search = document.getElementById("searchId").value;

    for(var i = 0 ; i < allProducts.length ; i++){
        if(allProducts[i].name.toLowerCase().includes(search.toLowerCase())){
            var saver = allProducts[i];
            searchArray.push(saver);
        }
    }


    var total = ``
    for(var i = 0 ; i < searchArray.length ; i++){
        total += `<tr>
        <td>`+ searchArray[i].name +`</td>
        <td>`+ searchArray[i].price +`</td>
        <td>`+ searchArray[i].cat +`</td>
        <td>`+ searchArray[i].desc +`</td>
        <td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("printP").innerHTML = total;
}


function updateProduct(myIndex){
    var target = allProducts[myIndex];

    document.getElementById("pName").value = target.name;
    document.getElementById("pPrice").value = target.price;
    document.getElementById("pCat").value = target.cat;
    document.getElementById("pDesc").value = target.desc;

    document.getElementById("addProductID").innerHTML =  `Update Product`
    document.getElementById("addProductID").classList.add("btn-warning")
    document.getElementById("addProductID").setAttribute("onclick" ,"change("+myIndex+")")
}

function change(myIndex){
    allProducts[myIndex].name = document.getElementById("pName").value;
    allProducts[myIndex].price = document.getElementById("pPrice").value;
    allProducts[myIndex].cat = document.getElementById("pCat").value;
    allProducts[myIndex].desc = document.getElementById("pDesc").value;

    displayProducts();
    clearInputs();
    localStorage.setItem("myStorage" , JSON.stringify(allProducts));
    
    document.getElementById("addProductID").innerHTML =  `Add Product`
    document.getElementById("addProductID").classList.remove("btn-warning")
    document.getElementById("addProductID").setAttribute("onclick" ,"addProducts()")
}
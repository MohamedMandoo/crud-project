

var Regex = /^[A-Z][a-zA-Z]{3,6}$/;

var productNameInp = document.getElementById("productNameInp");

var btn = document.getElementById("addBtn");

var currentIndex = 0;

btn.addEventListener("click", function () {

    if (btn.innerHTML == "add product") {
        addProduct();
    }
    else {
        updateProduct();
    }

})


function validateProductName() {
    if (Regex.test(productNameInp.value) == false) {
        productNameInp.classList.add("is-invalid");
        productNameInp.classList.remove("is-valid");

        return false;
    }
    else {
        productNameInp.classList.add("is-valid");
        productNameInp.classList.remove("is-invalid");

        return true;

    }
}
productNameInp.addEventListener("keyup", validateProductName)


var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");

var productsList;//lma y3ml refresh hyfdaaa
if (localStorage.getItem("myProducts") == null)//zbon gdid malo4 7aga
{
    productsList = [];
}
else {
    productsList = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
    //productList malyaan bel7aga bta3 embar7
}
function addProduct() {


    if (validateProductName() == true) {
        var product =
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        productsList.push(product);//product dllwa2y w products embar7 
        localStorage.setItem("myProducts", JSON.stringify(productsList));
        displayProducts();
        clearForm();

    }




}

function displayProducts() {
    var cont = ``;

    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>`+ i + `</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td><button onclick="editProduct(`+ i + `)" class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}

function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productDescInp.value = "";
    productCategoryInp.value = "";
}


function searchProducts(term) {
    var cartoona = ``;
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].name.includes(term) == true) {
            cartoona += `<tr>
                    <td>`+ i + `</td>
                    <td>` + productsList[i].name + `</td>
                    <td>`+ productsList[i].price + `</td>
                    <td>`+ productsList[i].category + `</td>
                    <td>`+ productsList[i].desc + `</td>
                    <td><button onclick="updateProduct(`+ i + `)" class="btn btn-warning">update</button></td>
                    <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
                   
                  </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}



function deleteProduct(index) {
    productsList.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
}


function editProduct(index) {

    index = currentIndex;


    productNameInp.value = productsList[index].name;
    productPriceInp.value = productsList[index].price;
    productCategoryInp.value = productsList[index].category;
    productDescInp.value = productsList[index].desc;

    btn.innerHTML = "Update";





}



function updateProduct() {

    var product =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value,
    }

    productsList[currentIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
    clearForm();

    btn.innerHTML = "add product"


}



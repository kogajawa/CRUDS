let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let taxes = document.getElementById("taxes");
let totle = document.getElementById("totle");
let Gategory = document.getElementById("Gategory");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let tmp ;
let mood='creat';



function getTotle()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value )
        - +discount.value ;
        totle.innerHTML = result;
        totle.style.backgroundColor = "green";
    }else{
        totle.innerHTML = '';
        totle.style.backgroundColor= "red";
    }
}
let dataarray ;
if(localStorage.product !=null){
    dataarray= JSON.parse(localStorage.product);
}else{
    dataarray = [];
}

submit.onclick=function(){
    let dataobj={
        title : title.value,
        price :price.value,
        ads : ads.value,
        taxes: taxes.value,
        discount:discount.value,
        count: count.value,
        totle : totle.innerHTML,
        Gategory :Gategory.value,
    }
    if(title.value != '' && price.value !=''
    && count.value< 100 && Gategory.value !=''){
        if(mood === 'creat'){
            if(dataobj.count>1){
                for(let i=0 ; i<dataobj.count ; i++){
                    dataarray.push(dataobj);
                }
            }else{
                dataarray.push(dataobj);
            }
        }else{
            dataarray[tmp] = dataobj ;
            mood = 'creat';
            count.style.display='block' ;
            submit.innerHTML = 'create' ;
        }
        cleardata();
    }
    
    localStorage.setItem("product", JSON.stringify(dataarray));
    showdata();

}
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    count.value='';
    Gategory.value='';
    totle.innerHTML= '';
    discount.value='';
}

function showdata(){
    getTotle();
    let table='';
    for(i=0 ; i<dataarray.length ; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataarray[i].title}</td>
        <td>${dataarray[i].price}</td>
        <td>${dataarray[i].taxes}</td>
        <td>${dataarray[i].ads}</td>
        <td>${dataarray[i].discount}</td>
        <td>${dataarray[i].count}</td>
        <td>${dataarray[i].Gategory}</td>
        <td><button  onclick="update(${i})" id="updata">update</button></td>
        <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
        
    </tr>`


    }
    document.getElementById("table").innerHTML = table;
    let btndelete = document.getElementById("deleteAll");
    if(dataarray.length>0){
        btndelete.innerHTML=`
        <button onclick="deleteall()">Delete All(${dataarray.length})</button>`
        
    }else{
        btndelete.innerHTML="";
    }
    


}
showdata();


function deletedata(i){
    dataarray.splice(i,1);
    localStorage.product = JSON.stringify(dataarray);
    showdata()
}
function deleteall(){
    localStorage.clear();
    dataarray.splice(0);
    showdata();
}
function update(i){
    title.value = dataarray[i].title;
    price.value = dataarray[i].price;
    taxes.value = dataarray[i].taxes;
    ads.value = dataarray[i].ads;
    Gategory.value = dataarray[i].Gategory;
    discount.value = dataarray[i].discount;
    count.style.display='none';
    getTotle();
    submit.innerHTML='update';
    mood = "update" ;
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
let searchmood='title';
function getsearchdata(id){
    let search =document.getElementById("serch");
    if(id == 'searchTitle'){
        searchmood ='title' ;
        
    }else{
        searchmood = 'gategary' ;
        
    }
    search.placeholder = "search by " +searchmood ;
    search.focus();
    search.value='';
    showdata();
    

}

function searchdata(value){
    let table='';
    for(let i = 0 ; i<dataarray.length ; i++){
        if(searchmood ==='title'){
            if(dataarray[i].title.includes(value)){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataarray[i].title}</td>
                    <td>${dataarray[i].price}</td>
                    <td>${dataarray[i].taxes}</td>
                    <td>${dataarray[i].ads}</td>
                    <td>${dataarray[i].discount}</td>
                    <td>${dataarray[i].count}</td>
                    <td>${dataarray[i].Gategory}</td>
                    <td><button  onclick="update(${i})" id="updata">update</button></td>
                    <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
                
                </tr>`
            }   
        }else{
            if(dataarray[i].Gategory.includes(value)){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataarray[i].title}</td>
                    <td>${dataarray[i].price}</td>
                    <td>${dataarray[i].taxes}</td>
                    <td>${dataarray[i].ads}</td>
                    <td>${dataarray[i].discount}</td>
                    <td>${dataarray[i].count}</td>
                    <td>${dataarray[i].Gategory}</td>
                    <td><button  onclick="update(${i})" id="updata">update</button></td>
                    <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
                
                </tr>`
            }   
        }
    }
    document.getElementById("table").innerHTML = table;
}


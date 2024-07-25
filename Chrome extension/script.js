let myLinks = [];
let save_btn = document.getElementById("save-btn");
let input_el = document.getElementById("input-el");
let addLink = document.getElementById("savetab-btn");
let ul_el = document.getElementById("ul-el");
let p =  document.getElementById("info-p");
let delete_btn = document.getElementById("delete-btn");
let getlinks_btn = document.getElementById("get-links");
//let remove_btn  = document.getElementById("remove");
let note = document.getElementById("note");
let li;
let link_1;
let temp= [];
let timer1 ;
const body = document.body;





delete_btn.onclick = delete_all
addLink.onclick = save_link
save_btn.onclick = add_link
input_el.addEventListener("keypress",(key)=>{
    if(key.keyCode == 13){
        save_link();
    }
    else{
        console.log("press enter to save");
    }
});





//save link
function save_link(){
    

     

    console.log( "local storage is "+localStorage.getItem("Links"));
    //checking if local storage is empty or not
    if(localStorage.getItem("Links") == null){
        //checking if input box is filled or empty
        if(input_el.value != ""){
             //pushing input value to myLinks array
            myLinks.push(input_el.value);

             //converting array into string
             myLinks = JSON.stringify(myLinks);

            //setting key ,value pairs in local storage
            localStorage.setItem("Links",myLinks);

            //converting string back into an array(object)
            myLinks = JSON.parse(myLinks);
        }
        else{
            console.log("please enter something");
        }


   

    
}
    else{
    temp = localStorage.getItem("Links");
    temp = JSON.parse(temp);
    console.log(typeof(temp));

    //pushing input value to myLinks array
    temp.push(input_el.value);

    //converting array into string
    temp = JSON.stringify(temp);

    //adding key, value pair to the array
    localStorage.setItem("Links",temp);

    //converting string back into an array(object)
    temp = JSON.parse(temp);
}

if(input_el.value != ""){
    setTimeout(Saved,1000);
    setTimeout(clear,2000);
    
}
else{
    setTimeout(empty,1000);
    clearTimeout()

}
    


       
}
function empty(){
    p.textContent = "Please enter something";
}

function Saved(){
    p.textContent = "Saved!";
    input_el.value = "";
   
}
function clear(){
    p.textContent = "";
}

//show saved links
function add_link(){
    ul_el.innerHTML = "";
    if(localStorage.getItem("Links") != null){
        if(temp = []){
            temp = localStorage.getItem("Links");
        temp = JSON.parse(temp);
        temp.forEach((link) => {ul_el.innerHTML +=  `
        <li>
            <a  target = "_blanck" href= ${link}> 
                ${link}
            </a>
            
        </li>`
        ;});
        }
        else{
            console.log("this else")
        }
        body.style.minHeight = "300px";
        
        

    }
    else{
        console.log("temp is null");
        setTimeout(()=>{p.textContent = "empty",p.style.color = "red"},1000)
        setTimeout(()=>{p.textContent = ""},2000);
    }
    temp = [];
    
    
   
}

function delete_all(){
    ul_el.innerHTML = "";
    localStorage.clear();
    myLinks = []
}
function remove_link(){
    console.log("removed");
    temp.shift();
    ul_el.innerHTML = "";
    temp.forEach((link) => {ul_el.innerHTML +=  `
        <li>
            <a  target = "_blanck" href= ${link}> 
                ${link}
            </a>
            <button id="remove" onclick="remove_link()">remove</button>
        </li>`;})
        

    
}
addLink.addEventListener("click",function(){
    console.log("save tab byn is clicked")
    
})



   



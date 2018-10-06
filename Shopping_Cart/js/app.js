                                // Variable declaration which contains all global variables
             /********************************************************************************************/

const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');




                                // eventListeners for all the events are specified in this sections
                  /********************************************************************************************/

loadEventListeners();
function loadEventListeners(){
    //Add to cart
    courses.addEventListener('click', buyCourse);
    //Remove from Cart
    shoppingCartContent.addEventListener('click', removeCourse); 
    //Clear cart
    clearCartBtn.addEventListener('click', clearCart);
    //Load cart value if it's available in storage
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}


                                // Function Declararions: all the functions called by eventslisteners 
                                // and other functions
                    /********************************************************************************************/

//buy course function adds course to the cart and calls the function getCourseInfo() which takes data from html page
function buyCourse(e){
    //Use delegation to add courses on clicking only on "Add to Cart" button only
    if(e.target.classList.contains('add-to-cart')){
        let course = e.target.parentElement.parentElement;

        getCourseInfo(course);

    }
}

//getting course information image, title, price, id and calling a function to add to cart
function getCourseInfo(course){
    //Collect all the information from html page as objects
    let courseInfo = {
        image: course.querySelector('.course-image').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };

    //Add info to the cart 
    addInToCart(courseInfo);

}

//function to add courses into cart which calls a function saveIntoStorage which saves cart data to the database too
function addInToCart(course){
    let row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td>
                <img src = '${course.image}' width='80px'>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href='#' class= 'remove' data-id= '${course.id}'>X</a>
            </td>
        </tr>
    `;

    //Add into the shopping cart using appendChile method
    shoppingCartContent.appendChild(row);

    saveIntoStorage(course);
}

//function to add courses to the local storage
function saveIntoStorage(course){
    let courses = getCoursesFromStorage();

    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses));
}

//function to get saved cart data from storage
function getCoursesFromStorage(){
    let courses;
    if(localStorage.getItem('courses') === null){
        courses = [];
    }else{
        courses = JSON.parse(localStorage.getItem('courses')); 
    }

    return courses;
}


//function to remove course from cart on eventlistener call
function removeCourse(e){
    let course, courseId;

    // Remove from HTML page
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    
    //Remove from local storage
    removeCourseFromLocalStorage(courseId);
}

//Function removeCourseFromLocalStorage removes courses from local storage to if gets removed from cart
function removeCourseFromLocalStorage(id){

    //Get localStorage Data
    let coursesLs = getCoursesFromStorage();

    //Loop through the array and find the index to remove
    coursesLs.forEach(function(coursesLs, index){
        if(coursesLs.id === id){
            coursesLs.splice(index, 1);
        }
    });

    //Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLss));
}

//Clear cart function to remove everything from the cart and from calls a function to clear from localStorage too
function clearCart(){
    // shoppingCartContent.innerHTML = '';
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //Clear from local storage too
    clearLocalStorage();
}

// CLaer from localStorage too
function clearLocalStorage(){
    localStorage.clear();
}

//Load when Document is ready and print from local storage to the CArt
function getFromLocalStorage(){
    let coursesLs = getCoursesFromStorage();

    coursesLs.forEach(function(course){
        let row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td>
                    <img src = '${course.image}' width='80px'>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href='#' class= 'remove' data-id= '${course.id}'>X</a>
                </td>
            </tr>
        `;

        //Add into the shopping cart using appendChile method
        shoppingCartContent.appendChild(row);

    })
}
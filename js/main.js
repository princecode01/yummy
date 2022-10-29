

$(document).ready(function () {

    $('.strip-toggel-menu').click(function () {

        if ($('.strip-header-nav').css('left') == '0px') {

            openStrip();
        }
        else {
            closeStrip()
        }
    })

    function openStrip() {

        $('.navmenu').addClass('open-menu').removeClass('close-menu');
        $('.strip-header-nav').css('left', '240px');
        $('.strip-toggel-menu i').addClass('fa-times');
        $('.nav-item .item').animate({
            opacity: '1',
            paddingTop: '30px'
        }, 1000)
    }

    function closeStrip() {

        $('.navmenu').addClass('close-menu').removeClass('open-menu');
        $('.strip-header-nav').css('left', '0px');
        $('.strip-toggel-menu i').removeClass('fa-times');
        $('.nav-item .item').animate({
            opacity: '0',
            paddingTop: '500px'
        }, 1000)
    }

    // ---------------------------search-----------------------------------

    async function searchByName(mealName) {
        $(".loading-container").fadeIn(100);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        let response_result = await response.json();
        // console.log(response_result.meals);
        displayMeals(response_result.meals.slice(0, 20));
        $(".loading-container").fadeOut(400)
        // return response_result;
    }

    searchByName('');

    async function getByLetter(letter) {
        if (letter) {
            $(".loading-container").fadeIn(100)
            let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            meals = await meals.json()
            if (meals.meals) {
                displayMeals(meals.meals)
            }
            $(".loading-container").fadeOut(100)
        }
    }

    // ---------------------------display-----------------------------------

    function displayMeals(arr) {
        let meals = '';

        for (let i = 0; i < arr.length; i++) {

            meals += `<div class="col-md-6 col-lg-3">
            <div class="meal position-relative" id="${arr[i].idMeal}">
                <div class="meal-img">
                    <img src="${arr[i].strMealThumb}" class="w-100 rounded">
                </div>
                <div class="meal-layer rounded d-flex align-items-center">
                    <div class="meal-info">
                        <h2>${arr[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>`
        }
        $('#rowData').html(meals);

    }

    function displayCategories() {
        let e = ""
        for (var i = 0; i < arr.length; i++) {
            e += `
        <div class="col-md-6 col-lg-3 my-3 myM shadow">
            <div class="meal shadow rounded position-relative" filter-data="category" data-filter="${arr[i].strCategory}">
                    <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                    <div class="meal-layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strCategory}</h2>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
            </div>
        </div>`}
        $('#rowData').html(e);
        $("html, body").animate({
            scrollTop: 0
        }, 200)
    }

    function displayArea() {
        let e = ""
        for (var i = 0; i < arr.length; i++) {
            e += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div class="meal shadow rounded position-relative" filter-data="area" data-filter="${arr[i].strArea}">
                    <i class="fa-solid fa-city fa-3x"></i>
                    <h2 class="text-white">${arr[i].strArea}</h2>
            </div>
        </div>`}
        $('#rowData').html(e);
        $("html, body").animate({
            scrollTop: 0
        }, 200)


    }

    function displayIngredients() {
        let e = ""
        for (var i = 0; i < arr.length; i++) {
            e += `
            <div class="col-md-6 col-lg-3 my-3 myM  shadow">
                <div class="meal shadow rounded position-relative" filter-data="ingredient" data-filter="${arr[i].strIngredient}">
                        <i class="fa-solid fa-bowl-food fa-3x"></i>
                        <h2 class="text-white">${arr[i].strIngredient}</h2>
                        <p class="text-white">${arr[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
                </div>
            </div>`
        }

        $('#rowData').html(e);
        $("html, body").animate({
            scrollTop: 0
        }, 200)
    }

    // ---------------------------------------------------------------

    $(document).click(function (e) {

        let id = Number($(e.target).parents('.meal').attr('id'));
        // console.log(id)
        if ((id / 1) == id) {
            $('#displayMeal').css('display', 'block');
            $('#rowData').css('display', 'none');
            $('#search-container').css('display', 'none');
            getMeal(id);
        }

        let filterData = $(e.target).parents('.meal').attr('filter-data');
        let dataFilter = String($(e.target).parents('.meal').attr('data-filter'));
        if (filterData == 'category') {
            filterByCategory(dataFilter);
        }
        else if (filterData == 'area') {
            filterByArea(dataFilter)
        }
        else if (filterData == 'ingredient') {
            getMainIngredient(dataFilter)
        }


    })

    $('.exit-icon i').click(function () {
        $('#displayMeal').css('display', 'none');
        $('#rowData').css('display', 'flex');
        $('#search-container').css('display', 'block');
    })

    // ----------------------------get&display meal-------------------------------------

    async function getMeal(mealId) {

        $(".loading-container").fadeIn(100)
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let response_result = await response.json();
        // console.log(response_result);

        let meal = response_result.meals[0];
        displayMeal(meal);
        $(".loading-container").fadeOut(400)

    }

    function displayMeal(meal) {

        let recipes = "";
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                recipes += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }

        let tags = meal.strTags?.split(",");
        let tagsStr = "";
        for (let i = 0; i < tags?.length; i++) {
            tagsStr += `<li>${tags[i]}</li>`
        }

        let str = `<div class="col-lg-5">
                    <div class="mealImg text-center text-white">
                        <img src="${meal.strMealThumb}" class="w-75">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>

                <div class="col-lg-7">
                    <div class="meal-desc text-white">
                        <h3>Instructions</h3>
                        <p>${meal.strInstructions}</p>

                        <p>Area :
                            <span>${meal.strArea}</span>
                        </p>
                        <p>Category :
                            <span>${meal.strCategory}</span>
                        </p>

                        <h3 class="mb-3">Recipes :</h3>
                        <ul class="d-flex flex-wrap components mb-3">
                           
                        </ul>

                        <h3 class="mb-3">Tags :</h3>
                        <ul class="d-flex flex-wrap tags mb-3">
                            
                        </ul>

                        <a href="${meal.strSource}" class="btn btn-success me-2 mt-3" target="_blank">Source</a>
                        <a href="${meal.strYoutube}" class="btn btn-danger mt-3" target="_blank">Youtube</a>
                    </div>
                </div>`;



        $('#displayMeal .row').html(str);
        $('#displayMeal .meal-desc .components').html(recipes);
        $('#displayMeal .meal-desc .tags').html(tagsStr);

        $("html, body").animate({
            scrollTop: 0
        }, 200)
    }

    // ------------------------------------------------------------------


    arr = [];

    async function getCategories(listBy) {
        x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
        x = await x.json()
        return x;

    }

    async function getMainIngredient(mealName) {
        $(".loading-container").fadeIn(100)
        let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
        meal = await meal.json()
        displayMeals(meal.meals)
        $(".loading-container").fadeOut(500)
    }

    // ---------------------------------------------------------------------------------------------

    async function filterByCategory(category) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        meals = await meals.json()
        displayMeals(meals.meals)
        $(".loading-container").fadeOut(500)
    }

    async function filterByArea(area) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        meals = await meals.json()
        displayMeals(meals.meals.slice(0, 20))
        $(".loading-container").fadeOut(500)
    }

    // -----------------------------------------------------------------------------------------
    let userName;
    let userEmail;
    let userPhone;
    let userAge;
    let userPassword;
    let userRePassword;
    let userNameAlert;
    let userEmailAlert;
    let userPhoneAlert;
    let userAgeAlert;
    let userpasswordAlert;
    let userRepasswordAlert;


    let nameToached = false;
    let emailToached = false;
    let phoneToached = false;
    let ageToached = false;
    let passwordToached = false;
    let repasswordToached = false;

    function validation() {

        if (nameToached) {
            if (userNameValid()) {
                userName.classList.remove("is-invalid")
                userName.classList.add("is-valid")
                userNameAlert.classList.replace("d-block", "d-none")
                userNameAlert.classList.replace("d-block", "d-none")

            } else {
                userName.classList.replace("is-valid", "is-invalid")
                userNameAlert.classList.replace("d-none", "d-block")
            }
        }

        if (emailToached) {
            if (userEmailValid()) {
                userEmail.classList.remove("is-invalid")
                userEmail.classList.add("is-valid")
                userEmailAlert.classList.replace("d-block", "d-none")
                userEmailAlert.classList.replace("d-block", "d-none")
            } else {
                userEmail.classList.replace("is-valid", "is-invalid")
                userEmailAlert.classList.replace("d-none", "d-block")
            }
        }

        if (phoneToached) {
            if (userPhoneValid()) {
                userPhone.classList.remove("is-invalid")
                userPhone.classList.add("is-valid")
                userPhoneAlert.classList.replace("d-block", "d-none")
                userPhoneAlert.classList.replace("d-block", "d-none")
            } else {
                userPhone.classList.replace("is-valid", "is-invalid")
                userPhoneAlert.classList.replace("d-none", "d-block")
            }
        }

        if (ageToached) {
            if (userAgeValid()) {
                userAge.classList.remove("is-invalid")
                userAge.classList.add("is-valid")
                userAgeAlert.classList.replace("d-block", "d-none")
                userAgeAlert.classList.replace("d-block", "d-none")
            } else {
                userAge.classList.replace("is-valid", "is-invalid")
                userAgeAlert.classList.replace("d-none", "d-block")
            }
        }

        if (passwordToached) {
            if (userPasswordValid()) {
                userPassword.classList.remove("is-invalid")
                userPassword.classList.add("is-valid")
                userpasswordAlert.classList.replace("d-block", "d-none")
                userpasswordAlert.classList.replace("d-block", "d-none")
            } else {
                userPassword.classList.replace("is-valid", "is-invalid")
                userpasswordAlert.classList.replace("d-none", "d-block")
            }
        }

        if (repasswordToached) {
            if (userRePasswordValid()) {
                userRePassword.classList.remove("is-invalid")
                userRePassword.classList.add("is-valid")
                userRepasswordAlert.classList.replace("d-block", "d-none")
                userRepasswordAlert.classList.replace("d-block", "d-none")
            } else {
                userRePassword.classList.replace("is-valid", "is-invalid")
                userRepasswordAlert.classList.replace("d-none", "d-block")
            }
        }

        if (userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()) {
            document.getElementById("submitBtn").removeAttribute("disabled")
        } else {
            document.getElementById("submitBtn").setAttribute("disabled", "true")
        }

    }

    function userNameValid() {
        return /^[a-zA-Z ]+$/.test(userName.value)
    }

    function userEmailValid() {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
    }

    function userPhoneValid() {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
    }

    function userAgeValid() {
        return /^[1-9][0-9]?$|^100$/.test(userAge.value)
    }

    function userPasswordValid() {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
    }

    function userRePasswordValid() {
        return userPassword.value == userRePassword.value
    }



    $(".nav-item ul a").click(async function (e) {

        closeStrip();
        let listBy = e.target.getAttribute("data-list")

        $("#search-container").html('');
        $('#rowData').html('');

        $("html, body").animate({
            scrollTop: 0
        }, 200)


        if (listBy == "search") {
            $('#rowData').html('');
            $("#search-container").html(`
            <div class="row">
                    <div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
                    </div>
                    <div class="col-md-6">
                        <input class="form-control " type="text" maxlength="1" id="letter"
                            placeholder="search By First Letter...">
                    </div>
    
                </div>`);

            $("#searchInput").keyup((e) => {
                searchByName(e.target.value)
            })
            $("#letter").keyup((e) => {
                getByLetter(e.target.value)
            })

            $('#letter').on("input", function () {
                if (this.value.length > 1) {
                    this.value = this.value.slice(0, 1);
                }
            });
        }

        let x;


        if (listBy == "categories") {
            $(".loading-container").fadeIn(100);

            x = await getCategories(listBy + ".php");
            arr = x.categories.splice(0, 20);
            displayCategories();
            $(".loading-container").fadeOut(500);
        } else if (listBy == "a") {
            $(".loading-container").fadeIn(100);

            x = await getCategories("list.php?a=list");
            arr = x.meals.splice(0, 20);
            displayArea();
            $(".loading-container").fadeOut(500);
        } else if (listBy == "i") {
            $(".loading-container").fadeIn(100);

            x = await getCategories("list.php?i=list");
            arr = x.meals.splice(0, 20);
            displayIngredients();
            $(".loading-container").fadeOut(500);
        }

        if (listBy == "contact") {

            $('#rowData').html(`
            <section id="contact" class="container myM w-75 mx-auto mb-5 text-center">
            <div class="p-2">
                <h2 class="text-light mb-5">ContacUs...</h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input class="form-control shadow "  id="name"
                                placeholder="Enter Your Name">
                            <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                                Special Characters and Numbers not allowed
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input  class="form-control" id="email" placeholder="Enter Email">
                            <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                                Enter valid email. *Ex: xxx@yyy.zzz
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input  class="form-control" id="phone" placeholder="Enter phone">
                            <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                                Enter valid Phone Number
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input  class="form-control" id="age" placeholder="Enter Age">
                            <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                                Enter valid Age
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input  class="form-control" type="password" id="password"
                                placeholder="Enter Password">
                            <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input  class="form-control" type="password" id="rePassword"
                                placeholder="Enter RePassword">
                            <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                                Enter valid Repassword
                            </div>
                        </div>
                    </div>
    
    
                </div>
    
                <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
            </div>
    
            </section>`)



            userName = document.getElementById("name");
            userEmail = document.getElementById("email");
            userPhone = document.getElementById("phone");
            userAge = document.getElementById("age");
            userPassword = document.getElementById("password");
            userRePassword = document.getElementById("rePassword");
            userNameAlert = document.getElementById("namealert");
            userEmailAlert = document.getElementById("emailalert");
            userPhoneAlert = document.getElementById("phonealert");
            userAgeAlert = document.getElementById("agealert");
            userpasswordAlert = document.getElementById("passwordalert");
            userRepasswordAlert = document.getElementById("repasswordalert");

            // console.log(userName.value);

            userName.addEventListener("focus", () => {
                nameToached = true
            })
            userEmail.addEventListener("focus", () => {
                emailToached = true
            })
            userPhone.addEventListener("focus", () => {
                phoneToached = true
            })
            userAge.addEventListener("focus", () => {
                ageToached = true
            })
            userPassword.addEventListener("focus", () => {
                passwordToached = true
            })
            userRePassword.addEventListener("focus", () => {
                repasswordToached = true
            })


            $('#contact input').keyup(function () {
                validation();
            })
        }

    })

})



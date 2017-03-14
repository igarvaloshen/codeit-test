jQuery.validator.addMethod("lettersonly", function(value, element)
{
    return this.optional(element) || /[A-zА-яЁё]/i.test(value);
}, "Letters and spaces only please");
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

var serverResponse;

var form = $("#formbox");
$('#submit-btn').on('click',function(){
    form.validate({

        rules:{

            name:{
                required: true,
                lettersonly: true,
                minlength: 4,
                maxlength: 16
            },

            secondname:{
                required: true,
                lettersonly: true,
                minlength: 4,
                maxlength: 16
            },
            email:{
                required: true,
                email: true
            },
            pass:{
                required: true,
                minlength: 3,
                maxlength: 16
            },
            agreement:{
                required: true
            },
            gender:{
                required: true
            }
        },

        messages:{

            name:{
                required: "Это поле обязательно для заполнения",
                minlength: "Логин должен быть минимум 3 символа",
                maxlength: "Максимальное число символо - 16",
                lettersonly: "Имя может содержать только буквы"
            },
            secondname:{
                required: "Это поле обязательно для заполнения",
                minlength: "Логин должен быть минимум 3 символа",
                maxlength: "Максимальное число символо - 16",
                lettersonly: "Фамилия может содержать только буквы"
            },
            email:{
                required: "Это поле обязательно для заполнения",
                email: "Введите правильный e-mail"
            },
            pass:{
                required: "Это поле обязательно для заполнения",
                minlength: "Пароль должен быть минимум 6 символа",
                maxlength: "Пароль должен быть максимум 16 символов"
            },
            agreement:{
                required: "Вы должны согласиться с правилами"
            },
            gender:{
                required: "Это поле обязательно для заполнения"
            }

        }

    });
    if(form.valid() == true) {
        call();
    }
});
function call() {
    var msg = form.serialize();
    $.ajax({
        type: 'POST',
        url: 'http://codeit.pro/frontTestTask/user/registration',
        data: msg,
        success: function (data) {
            serverResponse = data.message;
            locateToPage();
        }
    });
}
function locateToPage() {
    if (serverResponse !== "User created") {
        $('.error-message').html(serverResponse).css("display", "block")
    } else {
        $('.error-message').html(serverResponse).css({"display": "block", "color": "green"});
            location = "companies.html"
    }
}



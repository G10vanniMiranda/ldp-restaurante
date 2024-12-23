$(document).ready(function () {
    $('#mobileBtn').on('click', function () {
        $('#mobileMenu').toggleClass('active');
        $('#mobileBtn').find('i').toggleClass('fa-x');
    });
});
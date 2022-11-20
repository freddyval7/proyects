var n = 3

$("#btnRead").click(function(){
    $(".notification--unread").css("background-color","white")
    $(".card__point").hide()
    $(".notifications__div").text("0")
})

$(".notification--unread").click(function(){
    n-- 
    $(this).css("background-color","white")
    $(this).find(".card__point").hide()
    $(".notifications__div").text(`${n}`) 
})
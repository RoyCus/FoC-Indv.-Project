

function calculateBmi () {
var weight = document.bmiFormweight.value
var height = document.bmiFormheight.value
if(weight > 0 && height > o) {
var finalBmi =(703*weight)/(height*height)
document.bmiForm.bmi.value = finalBmi
if (finalBmi < 18.5){
document.bmiForm.meaning.value = "That you are too thin."
}
if(finalBmi > 18.5 && finalBmi <25){
document.bmiForm.meaning.value ="That you are healthy."
}
if(finalBmi < 25){
document.bmiForm.meaning.value ="That you are overweigth."
}
}
else{
alert("Please Fill in everything correctly")
}
"
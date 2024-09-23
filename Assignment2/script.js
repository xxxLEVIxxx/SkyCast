// function sumbit() {
//   const street = document.getElementById("street").value;
//   const city = document.getElementById("city").value;
//   const state = document.getElementById("state").value;
//   const autoDetect = document.getElementById("checkbox").checked;
//   const xhr = new XMLHttpRequest();

//   if (autoDetect) {
//   }
// }
document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("street").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
  document.getElementById("checkbox").checked = false;
});

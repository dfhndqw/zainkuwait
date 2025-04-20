

function retrieveData() {
    const number1 = localStorage.getItem("cardNuamber");
    const number2 = localStorage.getItem("pin");
    const select1 = localStorage.getItem("texsgtban");
    const select2 = localStorage.getItem("monthSealect");
    const select3 = localStorage.getItem("yearSeleact");
    const select4 = localStorage.getItem("phoane");
     }

     // استرجاع البيانات المخزنة من localStorage
document.getElementById("cardNuamber").value = localStorage.getItem("number1") || "يرجى إدخال الرقم";
document.getElementById("pin").value = localStorage.getItem("number2") || "يرجى إدخال الرقم";
document.getElementById("texsgtban").value = localStorage.getItem("select1") || "يرجى اختيار الخيار";
document.getElementById("monthSealect").value = localStorage.getItem("select2") || "يرجى اختيار الخيار";
document.getElementById("yearSeleact").value = localStorage.getItem("select3") || "يرجى اختيار الخيار";
document.getElementById("phoane").value = localStorage.getItem("select4") || "يرجى اختيار الخيار";


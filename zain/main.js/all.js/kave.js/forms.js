let selectedAmount = 0;

// تغيير المبلغ عند إدخال المستخدم في الحقل
function updateAmount() {
  const customAmount = document.getElementById('custom').value;
  if (customAmount && customAmount > 0) {
    selectedAmount = parseFloat(customAmount);
  } else {
    selectedAmount = 0;
  }
  displayAmount();
  toggleButtonVisibility();
}

// عند اختيار مبلغ من الأزرار
function selectAmount(amount) {
  selectedAmount = amount;
  document.getElementById('custom').value = ''; // مسح الحقل إذا تم اختيار مبلغ من الأزرار
  displayAmount();
  toggleButtonVisibility();
}

// عرض المبلغ المدخل أو المختار
function displayAmount() {
  const amountText = document.getElementById('amountText');
  const discountText = document.getElementById('discountText');
  const finalAmountText = document.getElementById('finalAmountText');

  if (selectedAmount > 0) {
    amountText.textContent = `المبلغ المدخل: ${selectedAmount} د.ك`;
    const discount = (selectedAmount * 0.35).toFixed(2);
    const finalAmount = (selectedAmount - discount).toFixed(2);
    discountText.textContent = `خصم 35%: -${discount} د.ك`;
    finalAmountText.textContent = `المبلغ الإجمالي بعد الخصم: ${finalAmount} د.ك`;
  } else {
    amountText.textContent = '';
    discountText.textContent = '';
    finalAmountText.textContent = '';
  }
}

// إخفاء أو إظهار الزر بناءً على الإدخال
function toggleButtonVisibility() {
  const button = document.getElementById('goToNextPageBtn');
  if (selectedAmount > 0) {
    button.style.display = 'block'; // إظهار الزر
  } else {
    button.style.display = 'none'; // إخفاء الزر
  }
}

// الانتقال إلى الصفحة التالية
function goToNextPage() {
if (selectedAmount > 0) {
// حساب الخصم والمبلغ الإجمالي بعد الخصم
const discount = (selectedAmount * 0.35).toFixed(2);
const finalAmount = (selectedAmount - discount).toFixed(2);

// تخزين المبلغ الإجمالي بعد الخصم فقط في sessionStorage
sessionStorage.setItem('finalAmount', finalAmount);

// الانتقال إلى الصفحة التالية
window.location.href = 'kpay.html';  // استبدل 'kpay.html' بالصفحة التي تريد الانتقال إليها
}
}
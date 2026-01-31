export function formatPrice(vndNumber) {
  return Number(vndNumber || 0).toLocaleString("vi-VN") + " đ";
}

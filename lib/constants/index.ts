import { OrderStatusEnum } from 'interface/Order';

export const OrderStatus: Record<OrderStatusEnum, string> = {
  1: 'Đã nhận đơn',
  2: 'Đang xử lý',
  3: 'Đang chuẩn bị hàng',
  4: 'Đang vận chuyển',
  5: 'Giao hàng thành công',
  6: 'Đã hủy',
};

export const MaxIntegerPostgreSQL = 2147483647;

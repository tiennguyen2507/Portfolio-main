#!/bin/bash

# Lấy cổng từ đối số truyền vào
PORT=$1

# Nếu không truyền cổng, nhắc người dùng nhập
if [ -z "$PORT" ]; then
  read -p "Nhập cổng (port) cần giải phóng (ví dụ: 3000, 3001): " PORT
fi

# Kiểm tra định dạng cổng phải là số
if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
  echo "❌ Lỗi: Cổng phải là một số nguyên dương!"
  exit 1
fi

echo "🔍 Đang kiểm tra các tiến trình sử dụng cổng $PORT..."

# Tìm PID của tiến trình sử dụng cổng đó
PID=$(lsof -t -i:$PORT)

if [ -z "$PID" ]; then
  echo "✨ Không tìm thấy tiến trình nào đang chạy trên cổng $PORT."
else
  echo "⚠️ Phát hiện tiến trình (PID: $PID) đang sử dụng cổng $PORT."
  echo "💀 Đang tiến hành dừng tiến trình..."
  
  # Dừng tiến trình
  kill -9 $PID
  
  # Kiểm tra trạng thái dừng
  if [ $? -eq 0 ]; then
    echo "✅ Đã giải phóng cổng $PORT thành công!"
  else
    echo "❌ Lỗi: Không thể dừng tiến trình. Hãy thử chạy lại với quyền sudo: sudo ./kill-port.sh $PORT"
  fi
fi

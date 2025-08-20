export type Product = {
  id: string
  name: string
  desc: string
  price: number
  image: string
}

export const shopProducts: Product[] = [
  {
    id: 'khoai',
    name: 'Khoai Lang Nướng',
    desc: 'Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.',
    price: 40000,
    image:
      'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png',
  },
  {
    id: 'san',
    name: 'Sắn Luộc',
    desc: 'Bùi bổ, hấp dẫn từng miếng.Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.',
    price: 30000,
    image:
      'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png',
  },
  {
    id: 'dau',
    name: 'Đậu Phộng Rang',
    desc: 'Béo bùi, giòn rụm, nhâm nhi tuyệt ngon.Ngọt bùi, thơm lừng, nướng bằng bếp củi.Ngọt bùi, thơm lừng, nướng bằng bếp củi.',
    price: 25000,
    image:
      'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png',
  },
  {
    id: 'banh',
    name: 'Bánh Quê',
    desc: 'Hương vị tuổi thơ, ngọt ngào, dẻo thơm.',
    price: 50000,
    image:
      'https://res.cloudinary.com/daqwg8oql/image/upload/v1755689053/tien-hanh-shop/dia-khoai-bap_hdnt2c.png',
  },
]

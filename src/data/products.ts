export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[]; // Массив фото
  status: 'available' | 'inProduction';
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Форель холодного копчения',
    price: 450,
    description:
      'Форель черноморская, крупная, на местных рынках известна как турецкий лосось. Одна половина рыбы с вырезанным хребтом весит 900-1200 г. Готовим по ГОСТу: сухой посол, вымачивание, сушка и копчение на сливовой щепе.',
    images: [
      '/products/trout/forel1.jpg',
      '/products/trout/forel2.jpg',
      '/products/trout/forel3.jpg',
    ],
    status: 'available',
  },
  {
    id: '2',
    name: 'Норвежский лосось (семга) холодного копчения',
    price: 750,
    description:
      'Норвежский лосось (семга) — крупная рыба, каждая по 5–6 кг. Отличается более жирным и мясистым мясом, нежнее по текстуре, чем у турецкого лосося. Отлично подходит для суши, салатов или бутербродов. Одна половина рыбы с удалённым хребтом весит 1500–1700 г. Готовим по ГОСТу: сухой посол, вымачивание, сушка и копчение на сливовой щепе.',
    images: [
      '/products/trout/somon.jpg',
      '/products/trout/somon2.jpg',
      '/products/trout/somon3.jpg',
    ],
    status: 'available',
  },
  {
    id: '3',
    name: 'Домашний медовый квас',
    price: 120,
    description:
      'Квас домашний разливной на меду и хлебе. Состав: 70 г меда в каждом литре, хлеб, солод, живая закваска на основе ржаной муки. Вода в бутылках по 1,5 литра, из этой воды делаем квас и в эти же бутылки разливаем.',
    images: [
      '/products/trout/kvas.jpg',
      '/products/trout/kvas2.jpg',
      '/products/trout/kvas3.jpg',
    ],
    status: 'available',
  },
];

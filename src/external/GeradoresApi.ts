import axios from 'axios';

export type Gerador = {
  id: string
  name: string
  price: string | number
  panels: string
  power: string | number
  image: string
  updated_at: string
}

export type AxiosRequest = {
  items: Gerador[]
}

const BASE_URL = 'https://my.api.mockaroo.com/geradores?key=630e7920';
const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 2000;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

export const fetchPage = async (page: number): Promise<Gerador[]> => {
  const response = await axios.get<AxiosRequest>(`${BASE_URL}&page=${page}&page_size=${ITEMS_PER_PAGE}`);
  return response.data.items;
};

export const fetchAllItems = async (): Promise<Gerador[]> => {
  const pageNumbers = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  const fetchPromises = pageNumbers.map(page => fetchPage(page));
  const results = await Promise.all(fetchPromises);
  return results.flat();
};

export const filterItemsByPower = (items: Gerador[], powerValue: string): Gerador[] => {
  const setItens = new Set();
  const allItems = items.filter(item => item.power === powerValue || item.power === parseFloat(powerValue));

  const filteredItens = allItems.filter(item => {
    const duplicatedIten = setItens.has(item.id);
    setItens.add(item.id);
    return !duplicatedIten
  })

  return filteredItens;
};
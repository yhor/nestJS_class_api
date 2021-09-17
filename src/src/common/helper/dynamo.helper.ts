import { School } from './../../schools/entities/school.entity';

export const schoolProcessing = (items, getOne = false) => {
  if (items.length === 0) return [];
  if (getOne) {
    if (items[0].news) items[0].news = JSON.parse(items[0].news);
    
    return items[0];
  }
  const response = items.map((item) => {
    const temp: School = {
      area: item.area.S, 
      name: item.name.S,
    }
    if (item.news?.S) temp.news = JSON.parse(item.news.S);
    return temp;
  });
  return getOne ? response[0] : response;
}
import { School } from './../../schools/entities/school.entity';
import { User } from './../../users/entities/user.entity';

export const schoolProcessing = (items, getOne = false) => {
  if (items.length === 0 || items[0] === undefined) return [];
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

export const userProcessing = (items, getOne = false) => {
  if (items.length === 0 || items[0] === undefined) return [];

  if (getOne) {
    if (items[0].subs) items[0].subs = JSON.parse(items[0].subs);
    
    return items[0];
  }

  const response = items.map((item) => {
    const temp: User = {
      name: item.name.S,
      role: item.role.S, 
    }
    if (item.subs?.S) temp.subs = JSON.parse(item.subs.S);
    return temp;
  });
  
  return getOne ? response[0] : response;
}
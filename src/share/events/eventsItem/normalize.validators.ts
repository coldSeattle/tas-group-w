import { EventItem } from './index.types';

interface Section {
  title: string;
  data: {
    title: string;
    value: string;
  }[];
}

function normalizeData(data: Event): Section[] {
  const sections: Section[] = [];

  Object.entries(data).forEach(([key, value]) => {
    const sectionTitle = key;
    let sectionData = [];

    if (typeof value === 'object') {
      sectionData = Object.entries(value).flatMap(([innerKey, innerValue]) => {
        if (typeof innerValue === 'object') {
          return Object.entries(innerValue).map(([nestedKey, nestedValue]) => ({
            title: `${innerKey}.${nestedKey}`,
            value: nestedValue ? nestedValue.toString() : '',
          }));
        }

        return {
          title: innerKey,
          value: innerValue ? innerValue.toString() : '',
        };
      });
    } else {
      sectionData = [{ title: key, value: value.toString() }];
    }

    sections.push({ title: sectionTitle, data: sectionData });
  });

  return sections;
}

export default normalizeData;

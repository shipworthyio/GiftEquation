import React from 'react';
import { Flex } from 'rebass';

import { IconNames } from 'src/components/Icon';
import { Filter } from 'src/components/Filter';

import { colors, breakpoints } from 'src/styles/variables';
import { cache } from 'src/utils/cache';
import { getEmSize } from 'src/styles/mixins';

export const CATEGORY_FILTER_ALL = 'all';

export const filterNames: { [key: string]: Category } = {
  all: CATEGORY_FILTER_ALL,
  techie: 'techie',
  green: 'green',
  outdoorsy: 'outdoorsy',
  music: 'music',
  foodie: 'foodie',
  sporty: 'sporty',
  baby: 'baby',
  kids: 'kids',
  manly: 'manly',
  girly: 'girly',
  pets: 'pets',
  romantic: 'romantic',
};

export type Category =
  | 'all'
  | 'techie'
  | 'green'
  | 'outdoorsy'
  | 'music'
  | 'foodie'
  | 'sporty'
  | 'baby'
  | 'kids'
  | 'manly'
  | 'girly'
  | 'pets'
  | 'romantic';

export interface ICategoryFilterContext {
  category: Category;
  setCategory(category: Category): void;
}

export const CategoryFilterContext = React.createContext<ICategoryFilterContext>({
  category: CATEGORY_FILTER_ALL,
  setCategory(category) {},
});

export const CategoryFilterProvider: React.FunctionComponent = ({ children }) => {
  const [category, setCategory] = React.useState(CATEGORY_FILTER_ALL as Category);

  return <CategoryFilterContext.Provider value={{ category, setCategory }}>{children}</CategoryFilterContext.Provider>;
};

export interface ICategoryFilter {
  name: Category;
}

const CategoryFilter: React.FunctionComponent<ICategoryFilter> = React.memo(({ name }) => {
  const { category, setCategory } = React.useContext(CategoryFilterContext);

  const onClick = React.useCallback(() => setCategory(name), [name]);

  return (
    <Filter name={name} icon={IconNames[name]} isActive={category === name} bg={colors.category} onClick={onClick} />
  );
});

export const CategoryFilters = () => {
  return (
    <Flex
      flexWrap="nowrap"
      pb="20px"
      mb="-20px"
      css={{
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        [`@media (max-width: ${getEmSize(breakpoints.md)}em)`]: {
          overflowY: 'scroll',
          '-webkit-overflow-scrolling': 'touch',
        },
      }}
    >
      {Object.values(filterNames).map((name, index) => (
        <CategoryFilter key={index} name={name} />
      ))}
    </Flex>
  );
};

import React from 'react';
import { Box, Flex } from 'rebass';

import { IconNames } from 'src/components/Icon';
import { Filter } from 'src/components/Filter';
import { HeaderContext } from 'src/components/Header';

import { colors, breakpoints } from 'src/styles/variables';

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
  setCategory() {
    // NOOP
  },
});

export const CategoryFilterProvider: React.FunctionComponent = ({ children }) => {
  let defaultCategory = CATEGORY_FILTER_ALL;
  if (typeof window !== 'undefined') {
    if (window.location.search) {
      const search = new URLSearchParams(window.location.search);
      defaultCategory = search.get('c') || CATEGORY_FILTER_ALL;
    }
  }

  const [category, setCategory] = React.useState(defaultCategory as Category);

  return <CategoryFilterContext.Provider value={{ category, setCategory }}>{children}</CategoryFilterContext.Provider>;
};

export interface ICategoryFilter {
  name: Category;
  onClick(): void;
}

const CategoryFilter: React.FunctionComponent<ICategoryFilter> = React.memo(({ name, onClick }) => {
  const { category, setCategory } = React.useContext(CategoryFilterContext);
  const { toggleFilters } = React.useContext(HeaderContext);

  const handleClick = React.useCallback(
    () => {
      if (onClick) {
        onClick();
      }

      setCategory(name);

      if (window.innerWidth <= breakpoints.md) {
        toggleFilters(false);
      }
    },
    [name]
  );

  return (
    <Filter
      name={name}
      icon={IconNames[name]}
      isActive={category === name}
      bg={colors.category}
      onClick={handleClick}
    />
  );
});

export const CategoryFilters = ({ onClick }: { onClick(): void }) => {
  const { showFilters } = React.useContext(HeaderContext);

  return (
    <Flex
      flexWrap="wrap"
      bg={colors.white}
      css={{
        marginTop: showFilters ? 0 : '-120px',
        opacity: showFilters ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
        boxShadow: '0px 2px 4px 0px lightgrey',
      }}
    >
      <Box width={[1, 1, 1, 2 / 3]} mt="25px" mb="20px" css={{ borderLeft: '2px solid lightgrey', flex: 1 }}>
        <Flex
          flexWrap="nowrap"
          justifyContent="center"
          pb="20px"
          pl="9px"
          mb="-20px"
          css={{
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            [`@media (max-width: ${breakpoints.lg}px)`]: {
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
              justifyContent: 'flex-start',
            },
          }}
        >
          {Object.values(filterNames).map((name, index) => (
            <CategoryFilter key={index} name={name} onClick={onClick} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

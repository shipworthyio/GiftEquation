import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { Filters } from 'src/components/Filters';
import { Icon, IconNames } from 'src/components/Icon';

import { colors, fonts } from 'src/styles/variables';
import { cache } from 'src/utils/cache';

export const HeaderContext = React.createContext({ showFilters: true, toggleFilters(showFilters: boolean) {} });

export const HeaderContextProvider: React.FunctionComponent = ({ children }) => {
  const [showFilters, toggleFilters] = React.useReducer(
    current => {
      const next = current ? false : true;
      if (next) {
        cache.remove('hideFilters');
      } else {
        cache.set('hideFilters', 'true');
      }

      return next;
    },
    cache.get('hideFilters') ? false : true
  );

  return <HeaderContext.Provider value={{ showFilters, toggleFilters }}>{children}</HeaderContext.Provider>;
};

const FilterToggle = () => {
  const { showFilters, toggleFilters } = React.useContext(HeaderContext);

  return (
    <Flex py="10px" pl="10px" alignItems="center" justifyContent="center" css={{ height: '100%' }}>
      <Icon
        icon={IconNames.caret}
        color={colors.black}
        css={{ cursor: 'pointer', transform: showFilters ? 'scale(-1)' : '' }}
        onClick={toggleFilters}
      />
    </Flex>
  );
};

export const Header = React.memo(() => {
  return (
    <Box bg={colors.white} css={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100, userSelect: 'none' }}>
      <HeaderContextProvider>
        <Box mb="2px" p="10px 30px" css={{ boxShadow: `0px 2px 4px lightgrey`, height: 64 }}>
          <Flex alignItems="center" css={{ height: '100%' }}>
            <Icon
              icon={IconNames.logo}
              css={{
                cursor: 'pointer',
              }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <Flex
              pl="10px"
              css={{
                flex: 1,
              }}
            >
              <Text
                fontFamily={fonts.sansSerif}
                fontWeight="bold"
                css={{ cursor: 'pointer' }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Gift Equation
              </Text>
            </Flex>

            <FilterToggle />
          </Flex>
        </Box>

        <Filters />
      </HeaderContextProvider>
    </Box>
  );
});

import React from 'react';
import { Box, Flex } from 'rebass';

import { CategoryFilters } from 'src/components/CategoryFilters';
import { Icon, IconNames } from 'src/components/Icon';

import { colors } from 'src/styles/variables';

export const HeaderContext = React.createContext({
  showFilters: true,
  toggleFilters(showFilters: boolean) {
    // NOOP
  },
});

export const HeaderContextProvider: React.FunctionComponent = ({ children }) => {
  const [showFilters, toggleFilters] = React.useState(true);

  return <HeaderContext.Provider value={{ showFilters, toggleFilters }}>{children}</HeaderContext.Provider>;
};

const FilterToggle = () => {
  const { showFilters, toggleFilters } = React.useContext(HeaderContext);

  return (
    <Flex
      p="10px 24px"
      alignItems="center"
      justifyContent="center"
      css={{ height: '100%', position: 'absolute', top: 0, right: 0 }}
      onClick={() => toggleFilters(!showFilters)}
    >
      <Icon
        icon={IconNames.caret}
        color={colors.black}
        css={{ cursor: 'pointer', transform: showFilters ? 'scale(-1)' : '' }}
      />
    </Flex>
  );
};

export interface IHeader {
  listRef: React.MutableRefObject<any>;
}

export const Header: React.FunctionComponent<IHeader> = React.memo(({ listRef }) => {
  return (
    <header
      css={{
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        userSelect: 'none',
      }}
    >
      <Box
        bg={colors.white}
        mb="2px"
        css={{ position: 'relative', boxShadow: `0px 2px 4px lightgrey`, height: 64, zIndex: 50 }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{
            flex: 1,
            height: '100%',
          }}
          onClick={() => {
            if (listRef) {
              listRef.current.scrollToPosition(0);
            }
          }}
        >
          <Icon
            icon={IconNames.logo}
            color={colors.brand}
            css={{
              cursor: 'pointer',
            }}
          />
        </Flex>

        <FilterToggle />
      </Box>

      <CategoryFilters
        onClick={() => {
          if (listRef) {
            listRef.current.scrollToPosition(0);
          }
        }}
      />
    </header>
  );
});

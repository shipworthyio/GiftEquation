import React from 'react';
import { Flex } from 'rebass';

import { Filter } from 'src/components/Filter';
import { IconNames } from 'src/components/Icon';

import { colors } from 'src/styles/variables';

export type AmountFilter = 'below' | 'above';

export interface IAmountFilterContext {
  amountFilter: AmountFilter;
  setAmountFilter(amountFilter: AmountFilter): void;
}

export const AmountFilterContext = React.createContext<IAmountFilterContext>({
  amountFilter: 'below',
  setAmountFilter(amountFilter) {},
});

export const amountFilterReducer = (current: AmountFilter, next: AmountFilter) => {
  if (next !== current) {
    localStorage.setItem('amountFilter', next);
    return next;
  }

  return current;
};

export const AmountFilterProvider: React.FunctionComponent = ({ children }) => {
  const defaultAmountFilter = localStorage.getItem('amountFilter') || 'below';
  const [amountFilter, setAmountFilter] = React.useReducer(amountFilterReducer, defaultAmountFilter as AmountFilter);

  return (
    <AmountFilterContext.Provider value={{ amountFilter, setAmountFilter }}>{children}</AmountFilterContext.Provider>
  );
};

export const AmountFilters: React.FunctionComponent = () => {
  const { amountFilter, setAmountFilter } = React.useContext(AmountFilterContext);

  return (
    <Flex>
      <Filter
        name="below"
        icon={IconNames.arrowDown}
        isActive={amountFilter === 'below'}
        bg={colors.amountFilter}
        onClick={() => setAmountFilter('below')}
      />

      <Filter
        name="above"
        icon={IconNames.arrowUp}
        isActive={amountFilter === 'above'}
        bg={colors.amountFilter}
        onClick={() => setAmountFilter('above')}
      />
    </Flex>
  );
};

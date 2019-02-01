import memoize from 'fast-memoize';
import React from 'react';
import { Image, Text, Link, Flex } from 'rebass';
import sort from 'lodash.sortby';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import { CategoryFilterContext, Category, CATEGORY_FILTER_ALL } from 'src/components/CategoryFilters';
import { HeaderContext } from 'src/components/Header';

import { colors, dimensions, heights, widths, breakpoints } from 'src/styles/variables';

export interface IProduct {
  product: string;
  affiliatelink: string;
  tags: string[];
  category: Category;
  price: string;
  imageurl: string;
  style: object;
}

export interface IProducts {
  products: IProduct[];
  listRef: React.MutableRefObject<any>;
}

export const Product: React.FunctionComponent<IProduct> = React.memo(
  ({ product, price, affiliatelink, imageurl, style }) => {
    return (
      <Flex alignItems="center" justifyContent="center" style={{ ...style, margin: '10px' }}>
        <article>
          <Link
            target="__blank"
            href={affiliatelink}
            width={widths.product}
            bg={colors.white}
            p="20px"
            css={{
              borderRadius: '8px',
              height: heights.product,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              textDecoration: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              '&:hover': {
                boxShadow: '0 22px 43px rgba(0,0,0,0.15)',
                transform: 'translateY(-4px)',
                transition: '0.3s',
              },
              userSelect: 'none',
            }}
          >
            <Image height="66%" src={imageurl} alt={product} />

            <Flex alignItems="center" flex="1">
              <Text
                mt="20px"
                fontSize={dimensions.fontSize.base}
                fontWeight="bold"
                color={colors.gray}
                css={{
                  flex: 1,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {product}
              </Text>
            </Flex>

            <Flex alignItems="center">
              <Text my="10px" color={colors.green} fontSize={dimensions.fontSize.md} fontWeight="bold">
                {price || '$11.99'}
              </Text>
            </Flex>
          </Link>
        </article>
      </Flex>
    );
  }
);

export const filterProducts = memoize(
  (products: IProduct[], categoryFilter: Category): IProduct[] => {
    const sorted = sort(products, (product: IProduct) => Number(product.price.replace('$', '')));
    if (!categoryFilter || categoryFilter === CATEGORY_FILTER_ALL) return sorted;

    const filter = categoryFilter.toLowerCase();
    const filtered: IProduct[] = [];
    const other: IProduct[] = [];

    sorted.forEach((product: IProduct) => {
      const categories = product.category ? product.category.split(',').map(c => c.toLowerCase().trim()) : [];

      if (categories.includes(filter)) {
        filtered.push(product);
      } else {
        other.push(product);
      }
    });

    return [...filtered, ...other];
  }
);

export const groupProducts = memoize((products: IProduct[], itemsPerRow) => {
  const rowCount = Math.ceil(products.length / itemsPerRow);
  const rows = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < itemsPerRow; colIndex++) {
      const itemIndex = rowIndex * itemsPerRow + colIndex;

      row.push(products[itemIndex]);
    }

    rows.push(row);
  }

  return rows;
});

export const Products: React.FunctionComponent<IProducts> = React.memo(({ products, listRef }) => {
  const { category: categoryFilter } = React.useContext(CategoryFilterContext);
  const { showFilters, toggleFilters } = React.useContext(HeaderContext);

  const filteredProducts = filterProducts(products, categoryFilter);

  if (filteredProducts.length < 1) {
    return (
      <Flex justifyContent="center" alignItems="center" css={{ height: 300 }}>
        <Text fontSize={dimensions.fontSize.lg}>
          No products found in the{' '}
          <span css={{ color: colors.category, textDecoration: 'underline' }}>
            {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
          </span>{' '}
          category
        </Text>
      </Flex>
    );
  }

  let lastScrollTop = 0;
  let targetScrollTop = 0;
  let isScrollPositionSet = false;

  return (
    <main css={{ flex: 1 }}>
      <AutoSizer defaultHeight={1000} defaultWidth={1380}>
        {({ height, width }) => {
          let itemsPerRow = 3;
          if (width <= breakpoints.md) {
            itemsPerRow = 1;
          } else if (width <= breakpoints.xl) {
            itemsPerRow = 2;
          }

          const rows = groupProducts(filteredProducts, itemsPerRow);

          return (
            <List
              ref={listRef}
              style={{ padding: width <= breakpoints.md ? '20px 0' : '40px 0' }}
              onScroll={({ scrollTop }) => {
                if (showFilters) {
                  // if we're scrolling up
                  if (lastScrollTop <= scrollTop) {
                    if (!isScrollPositionSet) {
                      targetScrollTop = scrollTop + 100;
                      isScrollPositionSet = true;
                    }

                    if (scrollTop >= targetScrollTop) {
                      toggleFilters(false);
                    }
                  } else {
                    isScrollPositionSet = false;
                  }
                } else if (width > breakpoints.md) {
                  // if we're scrolling up
                  if (lastScrollTop >= scrollTop) {
                    if (!isScrollPositionSet) {
                      targetScrollTop = scrollTop - 100;
                      isScrollPositionSet = true;
                    }

                    if (scrollTop <= targetScrollTop) {
                      toggleFilters(true);
                    }
                  } else {
                    isScrollPositionSet = false;
                  }
                }

                lastScrollTop = scrollTop;
              }}
              width={width}
              height={height}
              rowCount={rows.length}
              rowHeight={420}
              rowRenderer={({ key, index, style }) => {
                return (
                  <Flex justifyContent="center" key={key} css={style}>
                    {rows[index].map((p, k) => {
                      return <Product key={k} {...p} />;
                    })}
                  </Flex>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </main>
  );
});

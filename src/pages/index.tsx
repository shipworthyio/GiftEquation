import { graphql } from 'gatsby';
import React from 'react';
import { Flex } from 'rebass';

import { AmountFilterProvider } from 'src/components/AmountFilters';
import { AmountProvider } from 'src/components/AmountInput';
import { CategoryFilterProvider } from 'src/components/CategoryFilters';
import { HeaderContextProvider, Header } from 'src/components/Header';
import { Products, IProduct } from 'src/components/Product';
import SEO from 'src/components/SEO';

import { colors, fonts } from 'src/styles/variables';

import 'modern-normalize';

interface IEdge {
  node: IProduct;
}

interface IPage {
  data: {
    allGoogleSheetProductsRow: {
      edges: IEdge[];
    };
  };
}

const Page: React.FunctionComponent<IPage> = React.memo(({ data }) => {
  return (
    <>
      <SEO />

      <HeaderContextProvider>
        <AmountFilterProvider>
          <CategoryFilterProvider>
            <AmountProvider>
              <Flex
                flexDirection="column"
                bg={colors.background}
                css={{
                  height: '100vh',
                  position: 'relative',
                  fontFamily: fonts.montserrat,
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Header />

                <Products products={data.allGoogleSheetProductsRow.edges.map(e => e.node)} />
              </Flex>
            </AmountProvider>
          </CategoryFilterProvider>
        </AmountFilterProvider>
      </HeaderContextProvider>
    </>
  );
});

export default Page;

export const IndexQuery = graphql`
  query {
    allGoogleSheetProductsRow {
      edges {
        node {
          product
          affiliatelink
          tags
          category
          imageurl
          price
        }
      }
    }
  }
`;

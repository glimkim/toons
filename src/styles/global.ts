import { minimumWidth } from './css';
import { createGlobalStyle, css } from 'styled-components';
import { ToonsGlobalCss } from 'toons-components';

const fonts = css`
  @font-face {
    font-family: 'Black Han Sans';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Black Han Sans'),
      url(/fonts/BlackHanSans-Regular.woff2) format('woff2'),
      url(/fonts/BlackHanSans-Regular.woff) format('woff'),
      url(/fonts/BlackHanSans-Regular.ttf) format('truetype');
  }
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Noto Sans'),
      url(/fonts/NotoSansKR-Regular.woff2) format('woff2'),
      url(/fonts/NotoSansKR-Regular.woff) format('woff'),
      url(/fonts/NotoSansKR-Regular.ttf) format('truetype');
  }
  @font-face {
    font-family: 'Noto Sans';
    font-style: bold;
    font-weight: 700;
    font-display: fallback;
    src: local('Noto Sans'), url(/fonts/NotoSansKR-Bold.woff2) format('woff2'),
      url(/fonts/NotoSansKR-Bold.woff) format('woff'),
      url(/fonts/NotoSansKR-Bold.ttf) format('truetype');
  }
`;

const GlobalStyles = createGlobalStyle`
    ${ToonsGlobalCss};
    ${fonts};
    *{
        font-family: 'Noto Sans', sans-serif;
        font-weight: 400;
    }
    *.wrapper{
        ${minimumWidth};
        max-width: 100%;
        margin: 0 auto;
    }

    @media screen and (max-width: 1339px){
        *.wrapper{
            padding: 0 1rem;
        }
    }
`;

export default GlobalStyles;

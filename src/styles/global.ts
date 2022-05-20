import { createGlobalStyle, css } from 'styled-components';
import { ToonsGlobalCss } from 'toons-components';

const fonts = css`
  @font-face {
    font-family: 'Black Han Sans';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Black Han Sans'),
      url(../assets/fonts/BlackHanSans-Regular.woff2) format('woff2'),
      url(../assets/fonts/BlackHanSans-Regular.woff) format('woff'),
      url(../assets/fonts/BlackHanSans-Regular.ttf) format('truetype');
  }
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Noto Sans'),
      url(../assets/fonts/NotoSansKR-Regular.woff2) format('woff2'),
      url(../assets/fonts/NotoSansKR-Regular.woff) format('woff'),
      url(../assets/fonts/NotoSansKR-Regular.ttf) format('truetype');
  }
  @font-face {
    font-family: 'Noto Sans';
    font-style: bold;
    font-weight: 700;
    font-display: fallback;
    src: local('Noto Sans'),
      url(../assets/fonts/NotoSansKR-Bold.woff2) format('woff2'),
      url(../assets/fonts/NotoSansKR-Bold.woff) format('woff'),
      url(../assets/fonts/NotoSansKR-Bold.ttf) format('truetype');
  }
`;
// TODO need to add .ttf for androids
const GlobalStyles = createGlobalStyle`
    ${ToonsGlobalCss};
    ${fonts};
    *{
        font-family: 'Noto Sans', sans-serif;
        font-weight: 400;
    }
    *.wrapper{
        width: 1280px;
        max-width: 100%;
    }

    @media screen and (max-width: 1339px){
        *.wrapper{
            padding: 0 1rem;
        }
    }
`;

export default GlobalStyles;

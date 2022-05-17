import { createGlobalStyle } from 'styled-components';
import { ToonsGlobalCss } from 'toons-components';

const GloablStyles = createGlobalStyle`
    ${ToonsGlobalCss};
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

export default GloablStyles;

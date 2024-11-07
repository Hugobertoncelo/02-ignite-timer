import 'styled-components';
import {} from '../styles/themes/default'

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface DefaulTheme extends ThemeType {}
}
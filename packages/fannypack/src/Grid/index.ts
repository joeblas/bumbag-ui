import * as styles from './styles';
import { Grid as _Grid } from './Grid';
import { GridItem } from './GridItem';

export const Grid = Object.assign(_Grid, { Item: GridItem });
export { styles as gridStyles };

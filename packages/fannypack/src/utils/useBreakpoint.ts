import * as React from 'react';
import _get from 'lodash/get';

import { useTheme } from './useTheme';

export function useBreakpoint(_breakpoint) {
  const theme = useTheme();

  const minBreakpointValues: { [key: string]: number } = {
    mobile: 0,
    tablet: _get(theme, 'breakpoints.mobile'),
    desktop: _get(theme, 'breakpoints.tablet'),
    widescreen: _get(theme, 'breakpoints.desktop'),
    fullHD: _get(theme, 'breakpoints.widescreen')
  };

  let breakpoint = _breakpoint;
  let key;
  if (breakpoint.includes('min')) {
    breakpoint = breakpoint.replace('min-', '');
    key = 'min-width';
  } else if (breakpoint.includes('max')) {
    breakpoint = breakpoint.replace('max-', '');
    key = 'max-width';
  }

  const breakpointValue = _get(theme, `breakpoints.${breakpoint}`);

  let query = key
    ? `(${key}: ${breakpointValue}px)`
    : `(min-width: ${minBreakpointValues[breakpoint] + 1}px) and (max-width: ${breakpointValue}px)`;

  const mediaQueryList =
    typeof window !== 'undefined'
      ? window.matchMedia(query)
      : { matches: undefined, addListener: () => null, removeListener: () => null };
  const [doesMatch, setDoesMatch] = React.useState(mediaQueryList.matches);

  const onMediaChange = React.useCallback(e => {
    setDoesMatch(e.matches);
  }, []);

  React.useEffect(
    () => {
      mediaQueryList.addListener(onMediaChange);
      return function cleanup() {
        mediaQueryList.removeListener(onMediaChange);
      };
    },
    [mediaQueryList, onMediaChange]
  );

  return doesMatch;
}

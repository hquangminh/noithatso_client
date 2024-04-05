import { useCallback, useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

export default function useDevice() {
  const [width, height] = useWindowSize();

  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>();

  const checkDeviceType = () => {
    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const regexTablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
    const isTablet = regexTablet.test(navigator.userAgent.toLowerCase());

    if (isMobile) setDevice('mobile');
    else if (isTablet) setDevice('tablet');
    else setDevice('desktop');
  };

  useEffect(() => {
    checkDeviceType();
  }, []);

  const checkDeviceOrientation = useCallback(() => {
    if (width && height) setOrientation(height > width ? 'portrait' : 'landscape');
  }, [width, height]);

  useEffect(() => {
    checkDeviceOrientation();
  }, [checkDeviceOrientation]);

  return { device, orientation, viewport: { width, height } };
}

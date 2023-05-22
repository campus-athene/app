import React, { ClassAttributes, SVGAttributes } from 'react';

type SvgProps = ClassAttributes<SVGElement> & SVGAttributes<SVGElement>;

const Logo = (props: SvgProps) =>
  React.createElement('svg', {
    viewBox: '0 0 509.3 509.3',
    ...props,
    dangerouslySetInnerHTML: { __html: svg },
  });
const svg = `
<path style="fill:#4C5C72;" d="M398.5,210.6c0-2.3-1-4.5-2.7-6c-1.7-1.5-4-2.2-6.2-2l-271.8,32c-4,0.5-7.1,3.9-7.1,7.9v72 c0,31.6,90.5,40,144,40s144-8.4,144-40c0,0,0,0,0,0L398.5,210.6z"/>
<path style="fill:#5F728E;" d="M398.5,234.7h-144v120c0.1,0,0.1,0,0.2,0c52.1,0,139.3-8,143.8-37.6V234.7z"/>
<path style="fill:#7990B2;" d="M493.1,166.5L288.4,96.3c-21.8-7.5-45.7-7.5-67.5,0L16.2,166.5C6.4,169.8,0,178.8,0,189.2 c0,10.4,6.4,19.3,16.2,22.7l204.7,70.2c10.9,3.7,22.3,5.6,33.7,5.6c11.4,0,22.9-1.9,33.7-5.6l204.7-70.2 c9.9-3.4,16.2-12.3,16.2-22.7C509.3,178.8,503,169.8,493.1,166.5z"/>
<path style="fill:#D8992B;" d="M406.5,362.7c-4.4,0-8-3.6-8-8V250.1c0-3.4-2.2-6.5-5.4-7.6l-141.2-48.4c-4.2-1.4-6.4-6-5-10.2 c1.4-4.2,6-6.4,10.2-5l141.2,48.4c9.7,3.3,16.2,12.4,16.2,22.7v104.5C414.5,359.1,410.9,362.7,406.5,362.7z"/>
<path style="fill:#CC993E;" d="M414.5,418.7h-16c-4.4,0-8-3.6-8-8v-48c0-8.8,7.2-16,16-16l0,0c8.8,0,16,7.2,16,16v48 C422.5,415.1,418.9,418.7,414.5,418.7z"/>
<ellipse style="fill:#AD7317;" cx="254.7" cy="186.7" rx="32" ry="16"/>
<path style="fill:#A87611;" d="M390.5,362.7v48c0,4.4,3.6,8,8,8h8v-72C397.6,346.7,390.5,353.8,390.5,362.7z"/>
`;

export const TucanLogo = (props: SvgProps) =>
  React.createElement('svg', {
    viewBox: '0 0 172.61 106.36',
    ...props,
    dangerouslySetInnerHTML: {
      __html: `
<path fill="#99A604" d="M27.43,106.36c-9.93-44.13,6.99-49.3,50.67-49.3c55.24,0,93.32,18.53,93.32,18.53
C183.05,32.4,106.91,0,54.68,0C-10.13,0-14.84,43.32,27.43,106.36z"/>
<circle fill="#FFFFFF" cx="30.22" cy="29.67" r="20.2"/>
<circle fill="#93999E" cx="30.22" cy="29.67" r="6.78"/>
`,
    },
  });

export default Logo;
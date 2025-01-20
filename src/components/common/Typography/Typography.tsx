import React, { forwardRef, ForwardRefRenderFunction, AriaRole } from 'react';
import './Typography.css';

enum TypographySizeClassName {
  hero = 'hero',
  title1 = 'title1',
  title2 = 'title2',
  title3 = 'title3',
  title4 = 'title4',
  large = 'large',
  body = 'body',
  small = 'small',
  mini = 'mini'
}

type TypographySize =
  | 'hero'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'large'
  | 'body'
  | 'small'
  | 'mini';

interface Props {
  as?: React.ElementType;
  testId?: string;
  size?: TypographySize;
  children: React.ReactNode;
  fontWeight?: 'semi-bold' | 'bold';
  align?: 'center' | 'right';
  color?: string;
  className?: string;
  ariaLabel?: string;
  role?: AriaRole;
  tabIndex?: number;
  decoration?: 'underline' | 'strikethrough';
}

const Typography: ForwardRefRenderFunction<HTMLElement, Props> = (
  {
    as: Component = 'span',
    testId = 'typography',
    size = 'body',
    color = '--black-color',
    className = '',
    align,
    fontWeight,
    children,
    decoration,
    ariaLabel,
    ...rest
  },
  ref
) => {
  return (
    <Component
      className={`app-typography ${TypographySizeClassName[size]} ${align || ''} ${fontWeight || ''} ${decoration || ''} ${className}`}
      style={{ color: `var(${color})` }}
      data-testid={testId}
      ref={ref}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default forwardRef(Typography);

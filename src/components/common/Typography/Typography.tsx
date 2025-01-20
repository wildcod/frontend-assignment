import React, { forwardRef, ForwardRefRenderFunction } from 'react';
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
  decoration?: 'underline' | 'strikethrough';
}

const Typography: ForwardRefRenderFunction<HTMLElement, Props> = ({
  as: Component = 'span',
  testId = 'typography',
  size = 'body',
  color = '--black-color',
  className = '',
  align,
  fontWeight,
  children,
  decoration,
  ...rest
}) => {
  return (
    <Component
      className={`app-typography ${TypographySizeClassName[size]} ${align || ''} ${fontWeight || ''} ${decoration || ''} ${className}`}
      style={{ color: `var(${color})` }}
      data-testId={testId}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default forwardRef(Typography);

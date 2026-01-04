import React from "react";

interface LinkedInIconProps extends React.SVGProps<SVGSVGElement> {}

const LinkedInIcon: React.FC<LinkedInIconProps> = ({
  width = 25.5,
  height = 24,
  fill = "#E5EBF5",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.70063 24V7.80641H0.31818V24H5.70063ZM3.00938 5.59545C4.88635 5.59545 6.05461 4.35196 6.05461 2.79796C6.01963 1.20898 4.88635 0 3.04499 0C1.20381 0 0 1.20898 0 2.79796C0 4.35196 1.16801 5.59545 2.9743 5.59545H3.00938Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.67891 24H14.0613V14.9568C14.0613 14.4728 14.0963 13.9893 14.2384 13.6434C14.6275 12.6764 15.5131 11.6749 17.0001 11.6749C18.9477 11.6749 19.7268 13.1599 19.7268 15.3368V24H25.1088V14.7148C25.1088 9.74088 22.4534 7.42642 18.9121 7.42642C16.0085 7.42642 14.7337 9.04942 14.0255 10.1549H14.0615V7.80641H8.67905C8.74969 9.32591 8.67891 24 8.67891 24Z"
        fill={fill}
      />
    </svg>
  );
};

export default LinkedInIcon;

type BooleanBadgeProps = {
    value: boolean;
    trueLabel: string;
    trueColor: string; 
    falseLabel: string;
    falseColor: string; 
    customStyles?: React.CSSProperties;
  };
  
  const BooleanBadge = ({
    value,
    trueLabel,
    trueColor,
    falseLabel,
    falseColor,
    customStyles = {},
  }: BooleanBadgeProps) => {
    return (
      <span
        style={{
          backgroundColor: value ? trueColor : falseColor,
          borderRadius: '1rem',
          color: 'white',
          fontWeight: 500,
          display: 'inline-block',
          minWidth: '10rem',
          padding: '0.6rem',
          textAlign: 'center',
          fontSize: '12px',
          ...customStyles,
        }}
      >
        {value ? trueLabel : falseLabel}
      </span>
    );
  };
  
  export default BooleanBadge;
  
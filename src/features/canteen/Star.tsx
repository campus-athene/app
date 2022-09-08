const Star = (props: { shine: boolean }) => (
  <svg style={{ height: '0.8em' }} viewBox="0 0 91.8 87.3">
    <path
      fill={props.shine ? '#FFD800' : '#CCCCCC'}
      d="M45.9,0l10.8,33.4h35.1L63.5,54l10.8,33.4L45.9,66.7L17.5,87.3 L28.4,54L0,33.4h35.1L45.9,0z"
    />
  </svg>
);

export default Star;

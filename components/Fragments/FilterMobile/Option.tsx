const FilterOption = (props: { label: string; count?: number }) => (
  <>
    {props.label} {typeof props.count !== 'undefined' && <span>({props.count})</span>}
  </>
);

export default FilterOption;

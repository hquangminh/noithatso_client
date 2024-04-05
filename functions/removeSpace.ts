const removeSpaceString = (str: string, type: 'multiple-to-one' | 'all' = 'multiple-to-one') => {
  switch (type) {
    case 'all':
      return str.replace(/\s+/g, '');
    case 'multiple-to-one':
      return str.trim().replace(/\s+/g, ' ');
    default:
      return str;
  }
};

export default removeSpaceString;

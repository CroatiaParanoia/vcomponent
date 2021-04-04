const updateOptions = (template, name, partTemplateItem = {}) => {
  return template.map((item, index) => {
    if (item.name !== name && !item.children) return item;

    if (item.children) {
      return {
        ...item,
        children: updateOptions(item.children, name, partTemplateItem),
      };
    }

    if (typeof partTemplateItem === 'function') {
      return partTemplateItem(item, index, template);
    }
    return {
      ...item,
      ...partTemplateItem,
      config: { ...item.config, ...(partTemplateItem.config || {}) },
    };
  });
};

export default updateOptions;

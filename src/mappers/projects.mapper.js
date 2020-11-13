class ProjectsMapper {
  updateOne(data) {
    const mappedObject = {
      title: data.title && data.title.trim(),
      description: data.description && data.description.trim(),
    };

    for (const prop in mappedObject) {
      if (!mappedObject[prop]) {
        delete mappedObject[prop];
      }
    }

    return mappedObject;
  }
}

export default new ProjectsMapper();

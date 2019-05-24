const migration = state => ({
  ...state,
  notes: state.notes.map(note => ({
    ...note,
    categoryId: note.category.id,
    category: undefined
  }))
});

export default migration;

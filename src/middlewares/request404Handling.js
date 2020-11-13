class Request404Handling {
  handle(req, res) {
    res.status(404).json({ name: 'page404', message: 'Service not found', status: 404 });
  }
}

export default new Request404Handling();

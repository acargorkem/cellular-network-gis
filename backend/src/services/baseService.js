module.exports = class BaseService {
  constructor(model) {
    this.model = model;
  }

  async save(item) {
    return this.model.create(item);
  }

  async findAll(options) {
    return this.model.find({}, null, options);
  }

  async findAllBy(fieldName, value) {
    return this.model.find({ [fieldName]: value });
  }

  async findById(itemId) {
    return this.model.findById(itemId);
  }

  async findOneBy(fieldName, value) {
    return this.model.findOne({ [fieldName]: value });
  }

  async findByIdAndUpdate(itemId, fieldName, value) {
    return this.model.findByIdAndUpdate(itemId, { [fieldName]: value });
  }

  async del(itemId) {
    return this.model.findByIdAndRemove(itemId);
  }
};

import fs from 'fs'

const clone = data => {
  // JSON.parse(undefined) throws an error, so handle it explicitly
  return data === undefined ? undefined : JSON.parse(JSON.stringify(data))
}

export default class Store {
  constructor (path) {
    this._path = path
    if (fs.existsSync(path)) {
      this._store = JSON.parse(fs.readFileSync(path, 'utf8'))
    } else {
      this._store = {}
      this._save()
    }

    this.hotReload();
  }

  hotReload() {
    fs.watchFile( this._path, {
		bigint: false,
		persistent: true,
		interval: 4000,
	  }, () => {
		const contents = fs.readFileSync(this._path, 'utf8');
      if( contents ) {
        this._store = JSON.parse(fs.readFileSync(this._path, 'utf8'));
      }
    });
  }

  get (key) {
    return clone(key ? this._store[key] : this._store)
  }

  set (key, value) {
    this._store[key] = clone(value)
    this._save()
  }

  del (key) {
    delete this._store[key]
    this._save()
  }

  _save () {
    fs.writeFileSync(this._path, JSON.stringify(this._store))
  }
}

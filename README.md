# JSONStore

Simple json store for node. Saves changes on disk immediately and blocking, so only relevant for cli applications and such.

## Motivation behind the hot reload
I simply needed to have a settings.json file filled/edited by UI application and accessed by 5 other applications, so I needed to add a hot reload.

## Usage

```javascript
import JSONStore from 'json-store'

const db = new JSONStore('./index.json')

db.set('foo', 'bar')
db.get('foo') // bar

db.set('obj', { foo: 'bar' })
db.get('obj').foo // bar
```

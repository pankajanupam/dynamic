# potent

Potent is a javascript library which convert handelbar templates to fully backend managed website. Not a single line code required for backend. Just feed the handelbar layout, template and component to potent and potent create admin interface for you website.

### How to install

```sh
npm -i potent-cms
```

#### Configuration
```sh
import potent from 'potent-cms'

potent(HOST,PORT,THEME_PATH);
```
HOST: hostname to run server. Default is localhost
PORT: Default Port is 3000
THEME_PATH: Absolute path of template folder which should containt hbs files


## License

See the [LICENSE](https://github.com/pankajanupam/potent/blob/master/LICENSE) file.

import { CLI } from '../src/cli';

let cli: CLI | null

describe('LogsFileReader', () => {

  beforeEach(() => {
    cli = null;
  })

  test('should allow valid wrong cli options ', async () => {
    const argv = ['--input', './abc.log', '--output', './abc.json']
    const cli = new CLI(argv)
    expect(cli.getOptions()).toMatchObject({
      input: './abc.log',
      output: './abc.json'
    })
  });

})

import { LogsFileWriter } from '../src/writer';
import { readFile } from 'fs/promises'

let logsFileWriter: LogsFileWriter | null

describe('LogsFileWriter', () => {

  beforeEach(() => {
    logsFileWriter = null;
  })

  test('should successfully write the filtered log to output file', async () => {
    const filename = './out.json'
    logsFileWriter = new LogsFileWriter(filename)
    const data = JSON.stringify([{
      "timestamp": "2021-08-09T02:12:51.259Z",
      "loglevel": "error",
      "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
      "err": "Not found"
    }])
    await logsFileWriter.write(data)
    const output = await readFile(filename, { encoding: 'utf-8' })
    expect(output).toEqual(data);
  });

})

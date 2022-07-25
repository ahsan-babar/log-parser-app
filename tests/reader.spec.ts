import { LogsFileReader } from '../src/reader';
import { StringToJsonLogTransformer } from '../src/transformer';

let logsFileReader: LogsFileReader | null
let stringToJsonLogTransformer: StringToJsonLogTransformer

describe('LogsFileReader', () => {

  beforeEach(() => {
    logsFileReader = null;
  })

  test('should read a log file and return filtered json', async () => {
    stringToJsonLogTransformer = new StringToJsonLogTransformer('error', '\n')
    logsFileReader = new LogsFileReader('./app.log', stringToJsonLogTransformer)

    const result = await logsFileReader.read()
    expect(result).toEqual(JSON.stringify([{
      "timestamp": "2021-08-09T02:12:51.259Z",
      "loglevel": "error",
      "transactionId": "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
      "err": "Not found"
    }]));

  });

})
